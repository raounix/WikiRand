const { app, BrowserWindow,ipcMain } = require('electron')


function createWindow () {

  let win = new BrowserWindow({
    width: 723,
    height: 806,
    
    webPreferences: {
      nodeIntegration: true
    }
    
  }  
  )

//win.setResizable(false);

  

 
 
  
  win.loadFile('index.html')


} 

app.on('ready', createWindow)
