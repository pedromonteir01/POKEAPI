export default class Cadastro {
    constructor(nomesPoke, tiposPoke, habilidadesPoke) {
       this.nomesPoke = nomesPoke;
       this.tiposPoke = tiposPoke;
       this.habilidadesPoke = habilidadesPoke;
        this.id = this.getId()
    }
    getId(){
        return Math.floor(Math.random() *9999);
    }
}