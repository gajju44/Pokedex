import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import pokeLogo from '../assets/pika1.png';
import pokeLoading from '../assets/poke_loading.png';
import HoverButtonMenu from './button';

export default function Navbar() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredType, setFilteredType] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const API = "https://pokeapi.co/api/v2/pokemon?limit=649";

  async function fetchPokemon() {
    try {
      const response = await fetch(API);
      const data = await response.json();

      const detailedPokemonData = data.results.map(async (current) => {
        const response = await fetch(current.url);
        const data = await response.json();

        return data;
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

  const handleFilterChange = (type) => {
    setFilteredType(type);
  };

  const filteredPokemons = filteredType
    ? pokemon.filter((pokemonData) =>
        pokemonData.types.some((t) => t.type.name === filteredType)
      )
    : pokemon;

  const searchData = filteredPokemons.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen h-full justify-center items-center">
        <div className="w-52 h-52 absolute animate-progress-bar bg-[#eeeeee]"></div>
        <img className="w-52 h-52" src={pokeLoading} alt="Loading" />
      </div>
    );
  }

  if (error) {
    return <div><h1>{error.message}</h1></div>;
  }

  return (
    <>
      <div className="header bg-slate-200 shadow-md w-full h-16 py-3 px-4 flex items-center justify-between fixed top-0 left-0 z-50">
        {/* Logo and Title */}
        <div className="flex gap-1 items-center">
          <img className="w-11 h-11" src={pokeLogo} alt="Pokemon Logo" />
          <span className="text-2xl font-bold text-sky-950 hidden md:block">
            Who's That Pokemon !!!
          </span>
        </div>

        {/* Search and Filter for Desktop */}
        <div className="hidden md:flex items-center space-x-2">
          <input
            className="bg-slate-200 w-80 h-8 p-1 text-black shadow-md rounded-lg border-[1px] border-slate-400"
            type="text"
            placeholder="Search Pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <HoverButtonMenu onSelect={handleFilterChange} />
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-slate-200 shadow-md flex flex-col items-center space-y-3 py-4 md:hidden">
            <input
              className="bg-slate-200 w-64 h-8 p-1 text-black shadow-md rounded-lg border-[1px] border-slate-400"
              type="text"
              placeholder="Search Pokemon"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <HoverButtonMenu onSelect={handleFilterChange} />
          </div>
        )}
      </div>

      <div className=' w-full flex min-h-screen mt-14  justify-center'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-2 mx-auto md:px-8 absolute gap-11  xl:grid-cols-4  md:gap-3 '>
                   
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
