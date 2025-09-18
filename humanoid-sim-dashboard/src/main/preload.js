import { contextBridge, ipcRenderer } from 'electron';
contextBridge.exposeInMainWorld('api', {
    startTraining: (config) => ipcRenderer.invoke('start-training', config),
    detectCUDA: () => ipcRenderer.invoke('detect-cuda'),
    onMetricsStream: (callback) => ipcRenderer.on('metrics-stream', (_, data) => callback(data)),
    onErrorStream: (callback) => ipcRenderer.on('error-stream', (_, data) => callback(data))
});
