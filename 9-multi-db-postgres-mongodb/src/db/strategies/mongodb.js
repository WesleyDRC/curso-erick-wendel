const ICrud = require('./interfaces/interfaceCrud')
const Mongoose = require('mongoose')
const STATUS = {
    0: 'Desconectado', 
    1: 'Conectado',
    2: 'Conectando',
    3: 'Desconectando'
}
class MongoDB extends ICrud {
    constructor() {
        super()
        this._heroes = null
        this._driver = null
    }

    async isConnected() {
        const state = STATUS[this._driver.readyState]
        if(state === 'Conectado') return state;

        if(state !== 'Conectando' ) return state

        await new Promise(resolve => setTimeout(resolve, 1000))

        return STATUS[this._driver.readyState]
    }

    connect() {
        Mongoose.connect('mongodb://usermongo:usermongo@localhost:27017/heroes',
            { useNewUrlParser: true }, function (error) {
                if (!error) return;
                console.log('Falha na conexão', error)
            })
        const connection = Mongoose.connection
        connection.once('open', () => console.log('database rodando'))
        this._driver = connection
        this.defineModel()
    }

    defineModel() {
        const heroiSchema = new Mongoose.Schema({
            nome: {
                type: String,
                required: true
            },
            poder: {
                type: String,
                required: true
            },
            insertedAr: {
                type: Date,
                default: new Date()
            }
        })       
        this._heroes = Mongoose.model('heroes', heroiSchema)
    }

    create(item) {
        return this._heroes.create(item)
    }

    read(item, skip = 0, limit=10){
        return this._heroes.find(item).skip(skip).limit(limit)
    }

    update(id, item){
        console.log('id', id)
        return this._heroes.updateOne({ _id: id }, {$set: item })
    }

    delete(id){
        return this._heroes.deleteOne({ _id: id })
    }
}

module.exports = MongoDB