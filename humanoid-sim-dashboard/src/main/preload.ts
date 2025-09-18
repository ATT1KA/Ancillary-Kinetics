import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  startTraining: (config: any) => ipcRenderer.invoke('start-training', config),
  detectCUDA: () => ipcRenderer.invoke('detect-cuda')
});