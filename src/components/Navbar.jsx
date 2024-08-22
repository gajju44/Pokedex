import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import PokemonCard from './PokemonCard';

import pokeLogo from '../assets/pika1.png';
import pokeLoading from '../assets/poke_loading.png';


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
        return  <div className=' w-full h-full justify-center items-center'><div className='w-52 h-52 absolute animate-progress-bar bg-[#eeeeee]'></div><img className='w-52 h-52' src={pokeLoading} alt="Loading" /> </div>;
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
<div className='flex gap-1 items-center'>
      <span><img className='w-11 h-11' src={pokeLogo} alt="" /></span>
       <span className='text-2xl font-bold text-sky-950 md:block  xs:hidden' >Who's That Pokemon !!!</span>
       </div>
       <div className="pokemon-search absolute flex right-24 ">
          <input className='bg-slate-200 md:right-2 md:relative md:w-80 xs:w-36 xs:right-32 xs:relative h-8 p-1 text-black shadow-md shadow-slate-400 rounded-lg border-[1px] border-slate-400'
            type="text"
            placeholder="Search Pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
           <div className='  group'>
        <button className='h-8 bg-slate-600 flex items-center ' >Type</button>
     
        <div className='hidden absolute   group-hover:flex flex-col '>
        <button className='h-8 bg-slate-600  items-center flex' >Normal</button>
        <button className='h-8 bg-slate-600  items-center flex' >Fighting</button>
        <button className='h-8 bg-slate-600  items-center flex ' >Poison</button>
        <button className='h-8 bg-slate-600  items-center flex' >Water</button>
        <button className='h-8 bg-slate-600  items-center flex' >Grass</button>
        <button className='h-8 bg-slate-600  items-center flex' >T</button>
        <button className='h-8 bg-slate-600  items-center flex' >T</button>
        <button className='h-8 bg-slate-600 items-center flex' >T</button>
        </div>
        </div>
        </div>  
       

      </div>

      <div className='container w-screen flex min-h-screen absolute top-20 left-0 justify-center'>
                <div className='grid grid-cols-4 absolute gap-11 left-4 md:grid-cols-5 md:gap-3 xs:grid-cols-1 xxs:'>
                   
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
