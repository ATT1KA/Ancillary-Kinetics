import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  startTraining: (config: any) => ipcRenderer.invoke('start-training', config),
  detectCUDA: () => ipcRenderer.invoke('detect-cuda'),
  onMetricsStream: (callback: (data: string) => void) => ipcRenderer.on('metrics-stream', (_, data) => callback(data)),
  onErrorStream: (callback: (data: string) => void) => ipcRenderer.on('error-stream', (_, data) => callback(data))
});