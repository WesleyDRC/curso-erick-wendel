const ICrud = require('./interfaces/interfaceCrud')
const Sequelize = require('sequelize')

class Postgres extends ICrud {
    constructor(){
        super()
        this._driver = null
        this._heroes = null
    }
    async isConnected(){
        try{
            await this._driver.authenticate()
            return true
        } catch(error){
            console.log('Error', error)
            return false
        }

    }
    async defineModel(){
        this._heroes = this._driver.define('heroes',{
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
        await this._heroes.sync()
    }
    async create(item){
        const {
            dataValues
        } = await this._heroes.create(item)

        return dataValues
    }
    async update(id, item){
        return this._heroes.update(item, { where : { id: id }})
    }
    async read(item = {}){
       return this.result = this._heroes.findAll({ where: item, raw: true }) 
    }
    async delete(id){
        const query = await id ? {id} : {}
        return this._heroes.destroy({ where: query})
    }
    async connect(){
        this._driver = new Sequelize(
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
        await this.defineModel()
    }
}

module.exports = Postgres