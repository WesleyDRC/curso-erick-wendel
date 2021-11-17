const {Command} = require('commander')
const Commander = new Command()
const Database =  require('./database')
const options = Commander.opts();
const Heroi = require('./heroi')

async function main(){
    Commander
        .version('v1')
        .option('-n, --nome [value]', "Nome do herói")
        .option('-p, --poder [value]', "Poder do herói")
        .option('-i, --id [value]', "Id do herói")
        //CRUD
        .option('-c, --cadastrar', "Cadastrar herói")
        .option('-l, --listar', "Listar um herói")
        .option('-r, --remover', "Remover um herói pelo id")
        .option('-a, --atualizar [value]', "Atualizar um herói pelo id")

        Commander.parse(process.argv)

    const heroi = new Heroi(options)
    try{
        if(options.cadastrar){
            delete heroi.id
            const resultado = await Database.cadastrar(heroi)

            if(!resultado){
                console.error("Heroi não foi cadastrado!");
                return
            }
            console.log("Heroi foi cadastrado com sucesso!");
        }
        if(options.listar){
            const resultado = await Database.listar()
            console.log(resultado)
            return;
        }
        if(options.remover){
            const resultado = await Database.remover(heroi.id)
            if(!resultado){
                console.log("Não foi possível remover o herói")
                return;
            }
            console.log("Herói removido com sucesso")
        }
        if(options.atualizar){
            const idParaAtualizar = parseInt(options.atualizar)
            //remover todas as chaves que estiverem com undefined | null
            delete heroi.id;
            const dado = JSON.stringify(heroi)
            const heroiAtualizar = JSON.parse(dado)
           const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar)
           if(!resultado){
               console.error("Não foi possível atualizar o herói")
               return;
           }
           console.log("Herói atualizado com sucesso")
        }
    }

    catch(error){
        console.error(error)
    }
}

main()