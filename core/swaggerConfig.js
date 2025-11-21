// swaggerConfig.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0', // Versão do OpenAPI
    info: {
      title: 'API de Exemplo com Express e Swagger',
      version: '1.0.0',
      description: 'Documentação da API RESTful de Exemplo',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Altere para a porta do seu projeto
        description: 'Servidor de Desenvolvimento',
      },
    ],
  },
  // Arquivos onde o swagger-jsdoc irá procurar pelos comentários JSDoc para documentação
  apis: ['./src/routes*.js', './index.js'], // Ajuste o caminho conforme a estrutura do seu projeto
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;