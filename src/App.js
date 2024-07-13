import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import PokemonCard from "./components/PokemonCard";

function App() {
  const [pokeData, setPokeData] = useState([]);
  const [name, setName] = useState("");

  const fetchData = async () => {
    const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100");
    const response = res.data.results.map(async (pokemon) => {
      const pokemonData = await axios.get(pokemon.url);
      return pokemonData.data;
    });

    const result = await Promise.all(response);
    setPokeData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchFilterData = pokeData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(name.toLowerCase())
  );

  return (
    <div className="App">
      <div className="input">
        <h2>Search Pokemon</h2>
        <span>
          <input
            type="text"
            value={name}
            placeholder="Enter Pokemon Name..."
            onChange={(e) => setName(e.target.value)}
          />
        </span>
      </div>
      <div className="cards">
        {fetchFilterData.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default App;
