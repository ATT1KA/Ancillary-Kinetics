# Humanoid Sim Dashboard
Windows Electron app for VRM humanoid gen, RL training (PPO on Gym Humanoid), 3D vis.

## Setup
1. npm i
2. cd python && python install_cuda_pytorch.py
3. npm run dev

## Build
npm run build  # Outputs MSI in dist/

## Test
- Sliders morph VRM in real-time.
- Start training: Streams metrics to chart.
- CUDA: Auto-detects; fallback CPU.
- Playback: Request rollout via WS (extend for full IK retargeting).

Defense note: Scalable to classified MuJoCo variants—ping for Jetson port.