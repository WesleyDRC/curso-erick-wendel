// npm i hapi
const hapi = require('@hapi/hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroiSchema')
const HeroRoutes = require('./routes/heroRoutes')
const Joi = require('joi')

const app = new hapi.Server({
    port: 4500
})

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main () {
    const connection = MongoDb.connect()
    const context = new Context(new MongoDb(connection, HeroiSchema))

    app.route([
        ...mapRoutes(new HeroRoutes(context), HeroRoutes.methods())
    ])

    await app.start()
    console.log('Servidor rodando na porta', app.info.port)

    return app
}
module.exports = main()