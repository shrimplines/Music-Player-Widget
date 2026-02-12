const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // This sends the click to the main process
  sendControl: (command) => ipcRenderer.send('media-control', command),
  
  // This listens for the "Sent" confirmation to flash your screen green
  onTerminalLog: (callback) => ipcRenderer.on('terminal-log', (event, msg) => callback(msg)),
  
  // Metadata listeners so 'song' and 'artist' actually update
  onSpotifyData: (callback) => ipcRenderer.on('spotify-data', (event, data) => callback(data)),
  onProgressTick: (callback) => ipcRenderer.on('progress-tick', (event, percent) => callback(percent))
});
