docker run \
    --name postgres \
    -e POSTGRES_USER=wesley \
    -e POSTGRES_PASSWORD=admin \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres

docker exec -it mongo \
db.createUser(
{
   user: "user",
   pwd: "user",
   roles: [
     { role: "readWrite", db: "herois" }
   ]
})

use admin
db.createUser(
  {
    user: "wesley",
    pwd: "luis",
    roles: [ { role: "readWrite", db: "heroes" }, "readWriteAnyDatabase" ]
  }
)


docker exec -it mongodb `
    mongo --host localhost -u adminmongo -p adminmongo --authenticationDatabase admin `
    --eval "db.getSiblingDB('herois').createUser({user: 'wesley', pwd: 'luis', roles: [{role: 'readWrite', db: 'herois'}]})"



mongo --port 27017 --authenticationdatabase "admin" -u "adminmongo" -p "adminmongo"

use test
db.createuser(
  {
    user: "wesley",
    pwd: "wesley"
    roles: [ { role: "readwrite", db: "test" } ]
  }
)