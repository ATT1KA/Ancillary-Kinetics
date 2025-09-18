import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { spawn } from 'child_process';
let mainWindow;
let pythonProcess;
app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true
        }
    });
    if (app.isPackaged) {
        mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
    }
    else {
        mainWindow.loadURL('http://localhost:5173');
    }
});
ipcMain.handle('start-training', async (event, config) => {
    if (pythonProcess)
        pythonProcess.kill();
    const pyPath = app.isPackaged ? path.join(process.resourcesPath, 'python/trainer.py') : path.join(__dirname, '../../python/trainer.py');
    pythonProcess = spawn('python', [pyPath, JSON.stringify(config)], { stdio: ['pipe', 'pipe', 'pipe'] });
    const runId = 'sim-' + Date.now();
    pythonProcess.stdout?.on('data', (data) => {
        mainWindow?.webContents.send('metrics-stream', data.toString());
    });
    pythonProcess.stderr?.on('data', (data) => {
        mainWindow?.webContents.send('error-stream', data.toString());
    });
    return { runId, status: 'started' };
});
ipcMain.handle('detect-cuda', async () => {
    return new Promise((resolve) => {
        const pyPath = app.isPackaged ? path.join(process.resourcesPath, 'python/trainer.py') : path.join(__dirname, '../../python/trainer.py');
        const proc = spawn('python', ['-c', 'import torch; print(torch.cuda.is_available() and torch.cuda.device_count() > 0)'], { stdio: ['pipe', 'pipe', 'pipe'] });
        proc.stdout?.on('data', (data) => resolve(data.toString().trim() === 'True'));
    });
});
