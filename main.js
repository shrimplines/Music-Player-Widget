const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');

function createWindow() {
  const win = new BrowserWindow({
    width: 320, height: 180,
    transparent: true, frame: false, alwaysOnTop: true,
    webPreferences: {
      // Use the built-in Forge entry points if using Forge, 
      // otherwise use path.join(__dirname, 'preload.js')
      preload: typeof MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY !== 'undefined' 
               ? MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY 
               : path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  // Load your HTML
  if (typeof MAIN_WINDOW_WEBPACK_ENTRY !== 'undefined') {
    win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  } else {
    win.loadFile('index.html');
  }
}

// THIS HANDLES YOUR BUTTONS
ipcMain.on('media-control', (event, command) => {
  let powershellCommand = "";
  
  if (command === 'play-pause') powershellCommand = "pause";
  if (command === 'next') powershellCommand = "next";
  if (command === 'prev') powershellCommand = "prev";

  // This talks directly to Windows to press the media keys for you
  const script = `(New-Object -ComObject wscript.shell).SendKeys([char]17${powershellCommand === 'pause' ? '9' : powershellCommand === 'next' ? '6' : '7'})`;
  exec(`powershell -command "${script}"`);
});

app.whenReady().then(createWindow);
