export default class ListaPokemon {
    constructor() {
      this.lista = [];
      this.regisered = [];
    }
  
    add(pokemon) {
      this.lista.push(pokemon);
    }

    addRegistered(pokemon) {
        this.regisered.push(pokemon);
    }
  
    fill(lista) {
      this.lista = this.lista.concat(lista);
      this.unique();
    }
  
    // Remove duplicates
    unique() {
      this.lista = this.lista.filter(
        (pokemon, index, self) =>
          index === self.findIndex((p) => p.name === pokemon.name)
      );
    }
  
    getAll(limit) {
      return this.lista.slice(0, limit);
    }

    getRegistered() {
        return this.regisered;
    }

    getById(id) {
      return this.lista.find((pokemon) => pokemon.id == id);
    }

    deletePokemon(id) {
      return this.lista.filter((pokemon) => pokemon.id != id)
    }
  }
