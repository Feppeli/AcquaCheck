const express = require('express')
const app = express()
const router = require('./src/routes')
// const swaggerUi = require('swagger-ui-express');
// const swaggerSpec = require('./swaggerConfig');

require('dotenv').config();
app.use(express.json());

app.use(router)


// app.use(
//   '/api-docs',
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerSpec)
// );


app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
    console.log(`🔥http://localhost:${process.env.PORT}`)
})