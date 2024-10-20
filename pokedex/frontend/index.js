let pokemonData = [];

// Fetch data from mock server
async function fetchPokemon() {
  try {
    const response = await fetch("http://localhost:3000/pokemon");
    if (!response.ok) {
      throw new Error("http call failed");
    }
    const data = await response.json();
    pokemonData = data;
    renderApp();
  } catch (error) {
    console.error("Failed to fetch Pokemon data:", error);
    renderApp();
  }
}

/// Card component
function PokemonCard(props) {
  return React.createElement(
    "div",
    { className: "pokemon-card bg-gray-800 text-white p-4 rounded-lg w-48 h-60 flex-shrink-0 transition transform duration-300 ease-in-out hover:scale-105 shadow-lg" },
    React.createElement("img", { className: "w-full h-36 object-contain mb-2", src: props.image, alt: props.name }),
    React.createElement("h2", { className: "text-lg font-semibold text-center" }, props.name),
    React.createElement("p", { className: "text-center text-gray-400 text-sm" }, `Type: ${props.types}`)
  );
}

// Card component
function PokemonCard(props) {
  return React.createElement(
    "div",
    { className: "pokemon-card bg-gray-800 text-white p-4 rounded-lg w-48 h-60 flex-shrink-0 transition transform duration-300 ease-in-out hover:scale-105 shadow-lg m-2" }, // Menambahkan margin pada kartu
    React.createElement("img", { className: "w-full h-36 object-contain mb-2", src: props.image, alt: props.name }),
    React.createElement("h2", { className: "text-lg font-semibold text-center" }, props.name),
    React.createElement("p", { className: "text-center text-gray-400 text-sm" }, `Type: ${props.types}`)
  );
}

// Row component for creating horizontal scroll
function PokemonRow({ pokemons }) {
  return React.createElement(
    "div",
    { className: "flex overflow-x-auto py-2 mb-4" }, // Menambahkan margin bawah untuk pemisah antar scrollbar
    pokemons.map((pokemon) =>
      React.createElement(PokemonCard, {
        key: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.join("/"),
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
      })
    )
  );
}

// List component
function PokemonList() {
  if (pokemonData.length === 0) {
    return React.createElement(
      "p",
      { className: "text-center text-gray-400 text-lg" },
      "Loading Pokemon data..."
    );
  }

  // Split pokemons into rows
  const rows = [];
  const rowCount = 10; // Total rows to display

  for (let i = 0; i < Math.ceil(pokemonData.length / rowCount); i++) {
    rows.push(pokemonData.slice(i * rowCount, i * rowCount + rowCount));
  }

  return React.createElement(
    "div",
    null,
    rows.map((row, index) =>
      React.createElement(PokemonRow, { key: index, pokemons: row })
    )
  );
}

// App component
function App() {
  return React.createElement(
    "div",
    { className: "container mx-auto" },
    React.createElement(
      "header",
      { className: "bg-gray-800 py-6 shadow-md sticky top-0 z-10" },
      React.createElement(
        "h1",
        { className: "text-4xl font-bold text-center text-white" },
        "Pokedex"
      )
    ),
    React.createElement(PokemonList, null)
  );
}




// Function to render the app
function renderApp() {
  ReactDOM.render(React.createElement(App), document.getElementById("root"));
}

// Initial render
renderApp();

// Fetch and display the Pokemon data
fetchPokemon();
