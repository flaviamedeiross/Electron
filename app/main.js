const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('login.html') // comando que faz abrir a janela
}

app.whenReady().then(() => {
  createWindow()
})