// npm i hapi
const hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroiSchema')


const app = new hapi.Server({
    port: 4500
})

async function main () {
    const connection = MongoDb.connect()
    const context = new Context(new MongoDb(connection, HeroiSchema))

    app.route([
        {
            path: '/heroes',
            method: 'GET',
            handler: (request, head) => {
                return context.read()
            }
        }
    ])

    await app.start()
    console.log('Servidor rodando na porta', app.info.port)
}
main()