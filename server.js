const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'electron'
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    connection.query('INSERT INTO usuarios (email, senha) VALUES (?, ?)', [email, password], (error, results) => {
        if (error) {
            console.error('Erro ao inserir dados de login:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        } else {
            res.status(200).json({ message: 'Login cadastrado com sucesso' });
        }
    });
});

app.post('/cadastro', (req, res) => {
    const { nome, email, password, endereco, cep, bairro, cidade, estado } = req.body;
    connection.query('INSERT INTO cadastros (nome, email, senha, endereco, cep, bairro, cidade, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [nome, email, password, endereco, cep, rua, bairro, cidade, estado], (error, results) => {
        if (error) {
            console.error('Erro ao inserir dados de cadastro:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        } else {
            res.status(200).json({ message: 'Cadastro realizado com sucesso' });
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
