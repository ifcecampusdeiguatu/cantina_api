## Instalação e Configurações

Para rodar o projeto é necessário criar o arquivo ``.env`` e configuar as variáveis de ambiente como no exemplo deixado em ``.env.example``

Com o docker rodando, execute no terminal:

```shell
  docker-compose up -d --build
```

O próximo passo é instalar as depêndencias:

```shell 
  # Utilizando o yarn
  yarn

  # Utilizando o npm
  npm install
```

Depois é necessário rodar a migration para criar as tabelas no banco:

```shell 
  # Utilizando o yarn
  yarn prisma db push

  # Utilizando o npm
  npm run prisma db push
```

Para iniciar o servidor basta executar:

```shell
  # Utilizando o yarn
  yarn dev
  
  # Utilizando o npm
  npm run dev
```