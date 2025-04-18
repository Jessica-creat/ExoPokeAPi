let currentId = 1;

//Fonction chercher Pokémon
function fetchPokemon() {
    const search = document.getElementById('search').value.trim().toLowerCase();
    const query = search || currentId;

    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
      .then(response => {
        if (!response.ok) throw new Error("Pokémon non trouvé");
        return response.json();
      })
      .then(data => displayPokemon(data))
      .catch(error => {
        document.getElementById("pokemon-info").innerHTML = `<p style="color:red;">${error.message}</p>`;
      });
  }

  //visualiser les informations principales du pokémon
  function displayPokemon(pokemon) {
    currentId = pokemon.id;

    const types = pokemon.types.map(t => t.type.name).join(', ');
    const abilities = pokemon.abilities.map(a => a.ability.name).join(', ');

    document.getElementById("pokemon-info").innerHTML = `
      <h2>#${pokemon.id} - ${pokemon.name.toUpperCase()}</h2>
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
      <table>
        <tr><th>Nom</th><td>${pokemon.name}</td></tr>
        <tr><th>Poids</th><td>${pokemon.weight / 10} kg</td></tr>
        <tr><th>Taille</th><td>${pokemon.height / 10} m</td></tr>
        <tr><th>Types</th><td>${types}</td></tr>
        <tr><th>Capacités</th><td>${abilities}</td></tr>
        <tr><th>ID Pokédex</th><td>${pokemon.id}</td></tr>
      </table>
    `;
  }

  function nextPokemon() {
    if (currentId < 1025) { 
      currentId++;
      fetchPokemon();
    }
  }

  function previousPokemon() {
    if (currentId > 1) {
      currentId--;
      fetchPokemon();
    }
  }

  // Chargement initial du premier pokémon
  window.onload = () => fetchPokemon();

