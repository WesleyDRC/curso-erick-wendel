const assert = require('assert')
const api = require('../api')
let app = {}


describe.only('Suite de testes na API Heroes', function (){
    this.beforeAll(async () => {
        app = await api
    })
    
    it('listar /heroes', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/heroes?skip=0&limit=10'
        })
        
        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))

    })

    it('listar /heroes - deve retonar 10 registros', async () => {
        const TAMANHO_LIMITE = 10
        const result = await app.inject({
            method: 'GET',
            url: `/heroes?skip=0&limit=${TAMANHO_LIMITE}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(dados.length === TAMANHO_LIMITE)
    })

    it('listar /heroes - deve retonar um erro com limit incorreto', async () => {
        const TAMANHO_LIMITE = 'AEEe'
        const result = await app.inject({
            method: 'GET',
            url: `/heroes?skip=0&limit=${TAMANHO_LIMITE}`
        })
        const errorResult = {"statusCode":400,"error":"Bad Request","message":"\"limit\" must be a number","validation":{"source":"query","keys":["limit"]}}

        assert.deepEqual(result.statusCode, 400)
        
        assert.deepEqual(result.payload, JSON.stringify(errorResult))
    })

    it('listar /heroes - deve filtrar um item', async () => {

        const NAME = "Homem Aranha-1639660283553"
        const result = await app.inject({
            method: 'GET',
            url: `/heroes?skip=0&limit=1000&nome=${NAME}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        assert.deepEqual(statusCode, 200)
        assert.deepEqual(dados[0].nome, NAME)
    })
    
})