const service = require('./service')

async function main(){
    try{
        const result = await service.obterPessoas('w')
        const names = []

        console.time('for')
        for(var c = 0; c<=result.results.length -1; c++){
            const pessoa = result.results[c]
            names.push(pessoa.name)
        }
        console.timeEnd('for')

        console.time('forin')
        for( let c in result.results){
            const pessoa = result.results[c]
            names.push(pessoa.name)
        }
        console.log('names', names)
        console.timeEnd('forin')
        

        console.time('forof')
       for(pessoa of result.results){
           names.push(pessoa.name)
       }
       console.timeEnd('forof')
    } catch (erro) {
        console.log("Erro", erro)
    }
}
main()