## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Documentation API

Nosso projeto utilizou a POKEAPI, uma api de pokemon para realizar o trabalho. Ela é uma api  que consome pelo método HTTP GET. É recomendado que se use um parametro de limite no link.
O método HTTP necessita de um endpoint: (https://pokeapi.co/api/v2/{endpoint}/);
Exemplo:
https://pokeapi.co/api/v2/ability

o json virá com 4 informações

count: 248
next: "https://pokeapi.co/api/v2/ability/?limit=20&offset=20"
previous: null
results: []

O "count" diz sobre o total de recursos disponíveis através desta API 
O "next" é a URL para acessar a outra página da lista, mesma coisa para o "previous", mas é pra página anterior. Quando é null, não tem outra página
"results" é uma lista dos resultados da API

Dentro da results pode ter outros atributos, outras URLs e listas, dependendo da informação acessada.

Demais endpoints podem ser requisitados pelo nome ou pelo Id.

exemplo: "https://pokeapi.co/api/v2/contest-type/{id or name}/"

A utilizada na API é o endpoint de pokemons, "https://pokeapi.co/api/v2/pokemon/"