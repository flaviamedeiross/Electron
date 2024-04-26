# Dockerfile

# Imagem base
FROM node:latest

# Instalar dependências do Electron
RUN apt-get update && apt-get install -y \
  libgtk2.0-0 \
  libgtk-3-0 \
  libnotify-dev \
  libgconf-2-4 \
  libnss3 \
  libxss1 \
  libasound2 \
  libxtst6 \
  xauth \
  xvfb \
  curl \
  && rm -rf /var/lib/apt/lists/*

# Diretório de trabalho
WORKDIR /app

# Copiar arquivos da aplicação
COPY . .

# Instalar dependências
RUN npm install

# Expor a porta do MySQL
EXPOSE 3306

# Comando de inicialização
CMD ["npm", "start"]
