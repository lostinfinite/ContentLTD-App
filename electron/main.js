const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');

let mainWindow = null; // Define mainWindow variable

let tray = null;




const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    icon: path.join(__dirname, 'icon.jpg'),
    autoHideMenuBar: true,
    //frame: false
     // Correct path to icon
    // fullscreen: true
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('minimize', function(event){
    event.preventDefault();
    mainWindow.hide();
  });

  mainWindow.on('close', function(event) {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWindow.hide();
    }
    return false;
  });
};

app.whenReady().then(() => {
  tray = new Tray('./icon.jpg'); // Correct path to icon

  var contextMenu = Menu.buildFromTemplate([
    { label: 'Show App', click:  function() {
        mainWindow.show();
    } },
    { label: 'Quit', click:  function() {
        app.isQuiting = true;
        app.quit();
    } }
  ]);
  tray.setToolTip('ContentLTD');
  tray.setContextMenu(contextMenu);

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
