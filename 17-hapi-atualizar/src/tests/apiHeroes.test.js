const assert = require('assert')
const api = require('../api')
let app = {}
const MOCK_HEROI_CADASTRO = {
    nome: 'Hulk',
    poder: 'Força'
}
const MOCK_HEROI_INICIAL = { 
    nome: 'Lanterna Verde',
    poder: 'Anel'
}

let MOCK_ID = ''
describe.only('Suite de testes na API Heroes', function (){
    this.beforeAll(async () => {
        app = await api
        const result = await app.inject({
            method: 'POST',
            url: '/heroes',
            payload: JSON.stringify(MOCK_HEROI_INICIAL)
        })

        const dados = JSON.parse(result.payload)
        MOCK_ID = dados._id

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

    it('listar GET - /heroes - deve filtrar um item', async () => {

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

    it('cadastrar POST - /heroes', async () => {
        const result = await app.inject({
            method: 'POST',
            url: `/heroes`,
            payload: JSON.stringify(MOCK_HEROI_CADASTRO)
        })

        const statusCode = result.statusCode
        const { message, _id } = JSON.parse(result.payload) 
        assert.ok(statusCode === 200)    
        assert.notStrictEqual(_id, undefined)
        assert.deepEqual(message, "Heroi cadastrado com sucesso!")

    })

    it('atualizar PATCH - /heroes/:id', async () => {
        const _id = MOCK_ID
        const expected = {
            poder: 'Verde'
        }
        const result = await app.inject({
            method: 'PATCH',
            url: `/heroes/${_id}`,
            payload: JSON.stringify(expected)
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        
        assert.ok(statusCode === 200)
        assert.deepEqual(dados.message, "Heroi atualizado com sucesso!")
    })
    
    it('atualizar PATCH - /heroes/:id - não deve atualizar com id incorreto', async () => {
        const _id = `61b740cc68f6577e65aa6dd9`
        const expected = {
            poder: 'Verde'
        }
        const result = await app.inject({
            method: 'PATCH',
            url: `/heroes/${_id}`,
            payload: JSON.stringify(expected)
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        
        assert.ok(statusCode === 200)
        assert.deepEqual(dados.message, "Não foi possível atualizar!")
    })

})