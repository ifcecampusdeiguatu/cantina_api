## Instalação e Configurações

Para rodar o projeto é necessário criar o arquivo ``.env`` e configuar as variáveis de ambiente como no exemplo deixado em ``.env.example``

Com o docker rodando, execute no terminal:

```shell
  docker-compose up -d --build
```

O próximo passo é configurar o prisma dentro do container criado:

```shell 
  # Listando os containers e pegando o ID
  docker ps

  # Abrindo Shell do container 
  docker exec -it IdDoContainer sh

  # Submetendo as migrations para o prisma utilizando o yarn
  yarn prisma db push

  # Submetendo as migrations para o prisma utilizando o npm
  npm run prisma db push
```

## Documentação

Com o container devidamente configurado, basta acessar a documentação em http://localhost:3333/docs e consultar os recursos disponíveis até o devido momento.

Outra alternativa é utilizar o *Insomnia Api Client* e importar as configurações de projeto disponíveis na pasta `docs`.