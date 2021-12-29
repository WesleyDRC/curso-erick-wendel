// docker exec -it c98d7d7db0e2 mongo -u adminmongo -p adminmongo --authenticationDatabase admin
// docker exec -it mongodb `
//     mongo --host localhost -u adminmongo -p adminmongo --authenticationDatabase admin `
//     --eval "db.getSiblingDB('heroes').createUser({user: 'usermongo', pwd: 'usermongo', roles: [{role: 'readWrite', db:'heroes'}]})"


db.heroes.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1990-08-20'
})

db.heroes.find()
db.heroes.find().pretty()

for(let i = 0; i <= 50000; i++){
    db.heroes.insert({
        nome: `Miranha-${i}`,
        poder: 'Aranha',
        dataNascimento: '1990-08-20'
    })
}

db.heroes.findOne()

db.heroes.count()

db.heroes.find().limit(1000).sort({ nome: -1 })

db.heroes.find({},{ poder: 1, _id: 0})

// create

db.heroes.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1990-08-20'
})

// read

db.heroes.find()
db.heroes.find().pretty()
db.heroes.findOne()

// update

db.heroes.update({ _id: ObjectId("61b1fb12f8e581b3a471901b")},
                { $set: {nome: 'Superman'}})

db.heroes.update({ poder: 'Aranha'},
                {  $set: { poder: 'Super força'}})

// remove

db.heroes.remove({})



// mostrar todas databases
// show dbs
// mudando o contexto para uma database
//use heroes
// mostrar tables (coleçoes)
//show collections




