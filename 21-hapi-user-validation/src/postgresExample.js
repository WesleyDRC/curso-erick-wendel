// npm install sequelize
// npm install pg-hstore pg        (drivers do bando de dados)
const Sequelize = require('sequelize')
const driver = new Sequelize(
    'heroes',
    'adminpost',
    'adminpost',
    {
        host: 'localhost',
        // tipo de driver dialect
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorsAliases: false
    }
)

async function main(){
    const Heroes = driver.define('heroes',{
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
    }, {
        // Nome da tabela que estamos usando
        tableName: 'TB_HEROES',
        // Para não alterar as opções do banco
        freezeTableName: false,
        // Para não criar as propriedades que o Sequelize vai criando sozinho
        timestamps: false
    })
    await Heroes.sync()
    // await Heroes.create({
    //     nome:'Superman',
    //     poder: 'varios'
    // })
    const result = await Heroes.findAll({ 
        raw: true,
        attributes: ['nome']
    })
    console.log('result', result)
}


main()