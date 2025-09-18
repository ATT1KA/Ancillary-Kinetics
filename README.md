# Ancillary-Kinetics

## Humanoid Locomotion Simulator Dashboard

A comprehensive Electron-based desktop application for simulating and training humanoid locomotion using reinforcement learning (RL). Built with React, TypeScript, Three.js, and VRM for 3D visualization, paired with a Python backend using Stable-Baselines3 and Gymnasium.

### Features

- **Real-Time 3D Visualization**: Interactive VRM humanoid model with morphing controls for height, limbs, and more.
- **Reinforcement Learning Training**: Train PPO agents on Gymnasium's Humanoid-v4 environment with CUDA acceleration.
- **WebSocket Streaming**: Live metrics and rollout data streamed from Python to the dashboard.
- **Cross-Platform Build**: MSI installer for Windows deployment.
- **Modular Architecture**: Separate Electron main/renderer processes and Python backend for scalability.

### Prerequisites

- **Node.js** (v18+)
- **Python** (v3.8+)
- **CUDA** (optional, for GPU acceleration on NVIDIA rigs)
- **Windows** (primary target, with Electron support for cross-platform)

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ATT1KA/Ancillary-Kinetics.git
   cd Ancillary-Kinetics
   ```

2. **Frontend Setup**:
   ```bash
   cd humanoid-sim-dashboard
   npm install
   ```

3. **Backend Setup**:
   ```bash
   cd python
   pip install -r requirements.txt
   ```

4. **VRM Model**:
   - Place a sample VRM file (e.g., `base-humanoid.vrm`) in `public/`.
   - Fetch from [Three.js VRM examples](https://threejs.org/examples/#webgl_loader_gltf_variants) if needed.

### Usage

1. **Development Mode**:
   ```bash
   npm run dev
   ```
   - Starts Vite dev server and Electron app concurrently.
   - Access at `http://localhost:5173` with hot-reload.

2. **Training**:
   - Run Python trainer: `python trainer.py '{"env": "Humanoid-v4", "timesteps": 10000}'`
   - Monitors CUDA availability and streams metrics.

3. **Rollouts**:
   - Use WebSocket (localhost:8765) to request rollouts for visualization.

### Build

```bash
npm run build
```
- Compiles TypeScript, builds with Vite, and packages MSI via Electron Builder.
- Output in `dist/` folder.

### Project Structure

```
Ancillary-Kinetics/
├── humanoid-sim-dashboard/
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── electron-builder.config.js
│   ├── src/
│   │   ├── main/
│   │   │   ├── main.ts
│   │   │   └── preload.ts
│   │   └── renderer/
│   │       ├── App.tsx
│   │       ├── store.ts
│   │       ├── HumanoidPanel.tsx
│   │       ├── TrainingPanel.tsx
│   │       ├── MetricsChart.tsx
│   │       └── HumanoidModel.tsx
│   ├── public/
│   │   └── base-humanoid.vrm
│   ├── python/
│   │   ├── requirements.txt
│   │   ├── trainer.py
│   │   └── install_cuda_pytorch.py
│   └── assets/
└── README.md
```

### Technologies

- **Frontend**: React, TypeScript, Three.js, @react-three/fiber, @pixiv/three-vrm, Zustand, Chart.js
- **Backend**: Python, Stable-Baselines3, Gymnasium, PyTorch, WebSockets
- **Build**: Vite, Electron, Electron Builder
- **Deployment**: MSI for Windows

### Contributing

1. Fork the repo.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit changes: `git commit -m 'Add your feature'`.
4. Push: `git push origin feature/your-feature`.
5. Open a Pull Request.

### License

UNCLASSIFIED // FOR OFFICIAL USE ONLY

### Acknowledgments

- Based on Gymnasium Humanoid-v4 and Stable-Baselines3.
- VRM support via @pixiv/three-vrm.
- Electron for desktop integration.

For issues or questions, open a GitHub issue.