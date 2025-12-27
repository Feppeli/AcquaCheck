require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./src/routes')
const cors = require('cors');

const frontendOrigin = 'http://localhost:5173'
const frontendRender = 'https://acquacheck.onrender.com';
app.use(cors({
    origin: [frontendOrigin, frontendRender],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json());

app.use(router)


// app.use(
//   '/api-docs',
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerSpec)
// );


app.listen(process.env.SERVER_PORT, () => {
    console.log(`🔥http://localhost:${process.env.SERVER_PORT}`)
})