export default class Cadastros{
    constructor(){
        this.lista = [];
    }
    addCadastros(cadastro){
        this.lista.push(cadastro);
    }
    deleteCadastros(id){
    return this.lista = this.lista.filter(cadastro => cadastro.id !== id);

    }
    editarCadastro(id, nomesPoke, tiposPoke, habilidadesPoke){
    this.lista.map((cadastro) => {
        if(cadastro.id == id){
            cadastro.nomesPoke = nomesPoke;
            cadastro.tiposPoke = tiposPoke;
            cadastro.habilidadesPoke = habilidadesPoke;
        }})
    }
}