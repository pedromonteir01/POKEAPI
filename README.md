Documentação da PokeAPI
Introdução
A PokeAPI é uma API RESTful que fornece informações sobre Pokémon. Ela permite aos desenvolvedores acessar dados detalhados sobre as espécies de Pokémon, movimentos, tipos, habilidades e muito mais.

URL Base: https://pokeapi.co/api/v2/

Endpoints Principais
1. Espécies de Pokémon
Endpoint: /pokemon-species/{id ou nome}
Descrição: Obtém informações sobre uma espécie de Pokémon específica com base no ID ou nome fornecido.
Exemplo: https://pokeapi.co/api/v2/pokemon-species/25

Endpoint Espécies de Pokémon
Endpoint: /pokemon-species/{id ou nome}
Descrição: O endpoint "Espécies de Pokémon" permite aos desenvolvedores obter informações detalhadas sobre uma espécie de Pokémon específica com base no ID ou nome fornecido. Cada Pokémon tem uma entrada de espécie única que fornece informações sobre sua taxonomia, habitat, evoluções, cores e muito mais.
Exemplo de Uso:
Para obter informações sobre a espécie de Pikachu, que é o Pokémon com ID 25, você pode fazer a seguinte solicitação:

bash
Copy code
GET https://pokeapi.co/api/v2/pokemon-species/25
Exemplo de Resposta:
A resposta a essa solicitação conterá dados detalhados sobre a espécie de Pikachu. Alguns dos campos comuns encontrados na resposta incluem:

ID da Espécie: O ID único que identifica a espécie.
Nome da Espécie: O nome da espécie de Pokémon (por exemplo, "Pikachu").
Taxonomia: Informações sobre a classificação da espécie.
Habitat: Informações sobre o habitat natural da espécie.
Cor: A cor predominante da espécie.
Gerações: Informações sobre as gerações de jogos em que essa espécie apareceu.
A resposta também incluirá links para outras informações relacionadas à espécie, como movimentos que a espécie pode aprender, tipos de Pokémon associados e evoluções, entre outros.

Essas informações detalhadas são úteis para construir aplicativos, jogos ou serviços que envolvem Pokémon, permitindo que você exiba informações relevantes sobre cada espécie de Pokémon em seu projeto.