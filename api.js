const axios = require('axios');

async function getAddressByCEP(cep) {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const addressData = response.data;
    return {
      endereco: addressData.logradouro,
      bairro: addressData.bairro,
      cidade: addressData.localidade,
      estado: addressData.uf
    };
  } catch (error) {
    console.error("Erro ao encontrar endereço", error);
    return null;
  }
}

module.exports = getAddressByCEP;
