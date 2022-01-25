const Sequelize = require('sequelize/dist')

const HeroiSchema = {
    name: 'herois',
    schema: {
        id:{
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: Sequelize.STRING,
            required: true
        },
        poder: {
            type: Sequelize.STRING,
            required: true
        }
    }, 
    options: {
        // Nome da tabela que estamos usando
        tableName: 'TB_HEROES',
        // Para não alterar as opções do banco
        freezeTableName: false,
        // Para não criar as propriedades que o Sequelize vai criando sozinho
        timestamps: false
    }
}

module.exports = HeroiSchema