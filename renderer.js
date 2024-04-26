const { ipcRenderer } = require('electron');

function logar() {
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    
    // Envia os dados para o processo principal (main.js) para autenticação
    ipcRenderer.send('login', { email, password });
}

function cadastrar() {
    const nome = document.querySelector('input[name="nome"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const endereco = document.querySelector('input[name="endereco"]').value;
    const cep = document.querySelector('input[name="cep"]').value;

    // Envia os dados para o processo principal (main.js) para cadastro
    ipcRenderer.send('cadastro', { nome, email, password, endereco, cep });
}

function preencherEndereco(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            document.querySelector('input[name="endereco"]').value = data.logradouro;
            document.querySelector('input[name="bairro"]').value = data.bairro;
            document.querySelector('input[name="cidade"]').value = data.localidade;
            document.querySelector('input[name="estado"]').value = data.uf;
        })
        .catch(error => console.error('Erro ao preencher endereço:', error));
}

