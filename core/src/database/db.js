const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL || 'AcquaCheck', 'postgres', 'root', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
});

async function sincronizarBanco() {
  try {
    await sequelize.sync();
    console.log('Banco de dados sincronizado com sucesso (force: true).');
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  }
}

sincronizarBanco();

module.exports = sequelize;