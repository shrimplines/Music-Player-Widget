const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    // updated size to match your actual ipod shell
    width: 204, 
    height: 108,
    transparent: true, 
    frame: false, 
    alwaysOnTop: true, // keeps it in the front layer
    resizable: false, // keeps the shell from getting distorted
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  // this is the extra push to keep it above full-screen apps/games
  mainWindow.setAlwaysOnTop(true, 'screen-saver');
  
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
}

// listener for your ipod buttons
ipcMain.on('media-control', (event, command) => {
  let key;
  if (command === 'play-pause') key = 179;
  if (command === 'next') key = 176;
  if (command === 'prev') key = 177;

  if (key) {
    // sends the signal to windows to skip/pause the music
    const psCommand = `powershell -Command "$wshell = New-Object -ComObject WScript.Shell; $wshell.SendKeys([char]${key})"`;
    exec(psCommand);
  }
});

app.whenReady().then(createWindow);

// standard electron cleanup
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
