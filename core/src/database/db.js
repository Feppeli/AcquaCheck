require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejecUnauthorized: false
    }
  },
  logging: false
});

async function sincronizarBanco() {
  try {
    await sequelize.sync();
    console.log('✅ Banco de dados sincronizado com sucesso.');
  } catch (error) {
    console.error('❌ Erro ao sincronizar o banco de dados:', error);
  }
}

sincronizarBanco();

module.exports = sequelize;