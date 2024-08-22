import React from 'react'

function PokemonCard({pokemonData}){
  return (
    <>
    <div className="pokenmon group relative w-72 h-96 bg-slate-200 flex shadow-md  rounded-lg  flex-col">
    <div className="absolute flex justify-center items-center top-0 left-0 w-11/12 h-[40%] shadow-[0_-4px_6px_rgba(0,0,0,0.1)] shadow-indigo-700 bg-slate-200 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] group-hover:rounded-t-full -rotate-180">

    <img src={pokemonData.sprites.other.dream_world.front_default} alt="" className=' h-36 -rotate-180' />

    
    </div>
    <div className=' flex flex-col'>
     <h1 className='text-2xl text-sky-950  font-bold top-40 relative'>{pokemonData.name}</h1>
     <div className='flex flex-row justify-center relative left-1 top-44'>
     {
  pokemonData.types.map((curType, index) => {
  
    let bgColor;
    switch (curType.type.name) {
      case 'poison':
        bgColor = 'bg-purple-950'; 
        break;
      case 'water':
        bgColor = 'bg-blue-500';  
        break;
      case 'grass':
        bgColor = 'bg-green-500';  
        break;
        case'fire':
        bgColor ='bg-orange-600';
        break;
        case'ground':
        bgColor ='bg-[#ae8930]';
        break;

        case'rock':
        bgColor ='bg-[#413611]';
        break;

        case'flying':
        case'ice':
        bgColor ='bg-sky-400';
        break;

        case'normal':
        bgColor ='bg-[#f06a6a]';
        break;

        case'ghost':
        bgColor ='bg-indigo-600';
        break;
        
        case'bug':
        bgColor ='bg-green-700';
        break;
               
        case'psychic':
        bgColor ='bg-purple-700';
        break;

        case'electric':
        bgColor ='bg-yellow-500';
        break;
        
        case'steel':
        bgColor ='bg-gray-500';
        break;

        case'dark':
        bgColor ='bg-gray-800';
        break;

        case'dragon':
        bgColor ='bg-[#006777]';
        break;
       
      default:
        bgColor = 'bg-[#f06a6a]'; 
        break;
    }

    return (
      <p 
        key={index}
        className={`pb-1 flex  items-center justify-center whitespace-nowrap rounded-full w-32 h-8  gap-5 text-2xl font-bold ${bgColor}`}
      >
        {curType.type.name}
      </p>
    );
  })
}
</div>

    </div>

<div className='relative top-52 left-1 grid-cols-3 gap-1 grid '>
    <span className='text-sky-950 font-bold '>Height:{pokemonData.height}</span> 
    <span className='text-sky-950 font-bold '>Weight:{pokemonData.weight}</span>
    <span className='text-sky-950 font-bold '>speed:{pokemonData.stats[5].base_stat}</span>
    </div>
<br />
    <div className='relative top-52 text-sm left-1 grid-cols-3 gap-1 grid'>
    <span className='text-sky-950 font-bold '>{pokemonData.base_experience}<br/>Experience</span> 
    <span className='text-sky-950 font-bold '>{pokemonData.stats[1].base_stat}<br/>Attack</span>
  
    <select className='h-5 w-20 font-bold rounded-lg'>
    <option value="" disabled selected>Abilities:</option>
    {pokemonData.abilities.map((abilityInfo) => (
        <option key={abilityInfo.ability.name} value="" disabled>
            {abilityInfo.ability.name}
        </option>
    ))}
</select>
    </div>
    </div>

    </>
  );
}

export default PokemonCard
// {pokemonData.name}