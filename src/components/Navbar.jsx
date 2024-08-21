import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import PokemonCard from './PokemonCard';

export default function Navbar() {

  const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
   

    const API = "https://pokeapi.co/api/v2/pokemon?limit=649";

    async function fetchPokemon() {
        try {
            const response = await fetch(API);
            const data = await response.json();

            const detailedPokemonData = data.results.map(async (current) => {
                const response = await fetch(current.url);
                const data = await response.json();
             
                return data;
                // console.log(data);
            });

            const detailedResponse = await Promise.all(detailedPokemonData);
            setPokemon(detailedResponse);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPokemon();
    }, []);



    
    if (loading) {
        return <h1 className='text-4xl fixed top-96 font-bold text-yellow-400'>Loading....</h1>;
    }

    if (error) {
        return <div><h1>{error.message}</h1></div>;
    }

    


 

  const searchData = pokemon.filter((curPokemon) =>
  curPokemon.name.toLowerCase().includes(search.toLowerCase())
);

  return (
    
      <>

      <div className="header bg-slate-200 shadow-md w-screen h-16 py-3 px-4 flex items-center fixed top-0 left-0 z-50 ">

       <span className='text-2xl font-bold text-sky-950 text-border- absolute left-4 ' >Who's That Pokemon !!!</span>

       <div className="pokemon-search absolute right-24 ">
          <input className='bg-slate-200 w-80 h-8 p-1 text-black shadow-md shadow-slate-400 rounded-lg border-[1px] border-slate-400'
            type="text"
            placeholder="Search Pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>  
        <div className='absolute right-10 '>
        <button className='h-10 bg-slate-600 flex items-center ' >T</button>
        </div>

      </div>

      <div className='container w-screen flex min-h-screen absolute top-20 left-5'>
                <div className='grid grid-cols-4 gap-11 relative left-0'>
                   
                {searchData.map((curPokemon) => {
              return (
                <PokemonCard key={curPokemon.id} pokemonData={curPokemon} />
              );
            })}
                 
                </div>
            </div>
      </>
   
  );
}
