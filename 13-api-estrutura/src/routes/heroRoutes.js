const baseRoute = require('./base/baseRoute')

class HeroRoutes extends baseRoute{
    constructor(db){
        super()
        this.db = db
    }

    list () {
       return {
           path: '/heroes',
           method: 'GET',
           handler: (request, headers) => {
               return this.db.read()
           }
       } 
    }
}

module.exports = HeroRoutes