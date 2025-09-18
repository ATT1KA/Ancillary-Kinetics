import sys
import json
import threading
from typing import Dict
import torch
import gymnasium as gym
from stable_baselines3 import PPO
from stable_baselines3.common.vec_env import DummyVecEnv
from stable_baselines3.common.logger import configure
import websocket
import websockets
import asyncio
import numpy as np

# WS server for streams
async def ws_handler(websocket, path):
    async for message in websocket:
        data = json.loads(message)
        if data['type'] == 'request_rollout':
            # Simplified rollout
            env = gym.make('Humanoid-v4')
            obs, _ = env.reset(seed=data.get('seed', 42))
            poses = []  # Placeholder: collect joint poses
            for _ in range(100):  # 100 steps
                action = model.predict(obs, deterministic=True)[0]
                obs, reward, terminated, _, _ = env.step(action)
                poses.append({'joints': obs[:17].tolist()})  # MuJoCo qpos slice
                if terminated:
                    break
            await websocket.send(json.dumps({'type': 'rollout', 'poses': poses, 'reward': reward}))

def main():
    config = json.loads(sys.argv[1]) if len(sys.argv) > 1 else {'env': 'Humanoid-v4', 'algo': 'PPO', 'timesteps': 10000, 'device': 'cuda'}
    device = 'cuda' if torch.cuda.is_available() and config['device'] == 'cuda' else 'cpu'
    print(json.dumps({'type': 'status', 'device': device, 'cuda_count': torch.cuda.device_count() if torch.cuda.is_available() else 0}))

    env = DummyVecEnv([lambda: gym.make(config['env'])])
    model = PPO("MlpPolicy", env, device=device, verbose=1, tensorboard_log="./logs/")
    model.learn(total_timesteps=config['timesteps'], progress_bar=True)

    # Stream metrics (simplified; hook into SB3 callbacks for real)
    for i in range(100):  # Fake stream
        print(json.dumps({'step': i, 'reward': np.random.randn(), 'length': np.random.randint(100, 500)}))

    # Start WS server in thread
    start_server = websockets.serve(ws_handler, "localhost", 8765)
    threading.Thread(target=lambda: asyncio.run(start_server), daemon=True).start()

if __name__ == '__main__':
    main()