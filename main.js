const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const mysql = require('mysql');

let mainWindow;

function createWindow(filename) {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'renderer.js')
    }
  });

  mainWindow.loadFile(filename);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  createWindow('login.html');
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow('login.html');
  }
});

// Conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'electron'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
    return;
  }
  console.log('Conexão bem-sucedida com o banco de dados MySQL');
});

ipcMain.on('login', (event, data) => {
  const { username, password } = data;
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  connection.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      return mainWindow.webContents.send('login-response', { success: false, error: 'Erro ao autenticar o login.' });
    }

    if (results.length > 0) {
      mainWindow.webContents.send('login-response', { success: true, message: 'Login bem-sucedido.' });
    } else {
      mainWindow.webContents.send('login-response', { success: false, error: 'Usuário ou senha incorretos.' });
    }
  });
});

ipcMain.on('cadastro', (event, data) => {
  const { nome, email, password, endereco, cep } = data;
  const sql = 'INSERT INTO users (nome, email, password, endereco, cep) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [nome, email, password, endereco, cep], (err, results) => {
    if (err) {
      console.error('Erro ao cadastrar usuário:', err);
      return mainWindow.webContents.send('cadastro-response', { success: false, error: 'Erro ao cadastrar usuário.' });
    }
    mainWindow.webContents.send('cadastro-response', { success: true, message: 'Cadastro realizado com sucesso.' });
  });
});