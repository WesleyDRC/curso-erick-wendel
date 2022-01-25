const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')

// npm i jsonwebtoken
const Jwt = require('jsonwebtoken')
const failAction = (request, headers, error) => {
    throw error;
}

const USER = {
    username: 'wesley123',
    password: '123'
}

class AuthRoutes extends BaseRoute {
    constructor(secret) {
        super()
        this.secret = secret
    }
    login() {
        return {
            path: '/login',
            method: 'POST',
            config: {
                auth: false,
                tags: ['api'],
                description: 'Obter token',
                notes: 'faz login com username e password do banco',
                validate: {
                    failAction,
                    payload: Joi.object({
                        username: Joi.string().required(),
                        password: Joi.string().required()
                    })
                }
            },
            handler: async (request) => {
                const { username, password } = request.payload

                if (username.toLowerCase() !== USER.username ||
                    password !== USER.password)
                    return Boom.unauthorized()

                    const token = Jwt.sign({
                        username: username,
                        id: 1
                    }, this.secret)

                    return {
                        token
                    }
            }
        }
    }
}

module.exports = AuthRoutes