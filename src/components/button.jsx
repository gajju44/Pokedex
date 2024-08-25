import { useState } from 'react';

const colorMap = {
    'poison': 'bg-purple-950',
    'fighting': 'bg-red-900',
    'water': 'bg-blue-500',
    'grass': 'bg-green-500',
    'fire': 'bg-orange-600',
    'ground': 'bg-[#ae8930]',
    'rock': 'bg-[#413611]',
    'flying': 'bg-sky-500',
    'ice': 'bg-sky-300',
    'normal': 'bg-[#f06a6a]',
    'ghost': 'bg-indigo-600',
    'bug': 'bg-green-700',
    'psychic': 'bg-purple-700',
    'electric': 'bg-yellow-500',
    'steel': 'bg-gray-500',
    'dark': 'bg-gray-800',
    'dragon': 'bg-[#006777]',
   
};

const HoverButtonMenu = ({onSelect}) => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  const handleSelect = (type) => {
    setSelectedButton(type);
    setShowOptions(false);
    onSelect(type);
  };
  const handleReset = () => {
    setSelectedButton(null);
    setShowOptions(false);
    onSelect(null); // Reset the filter in Navbar
};

  return (
    <div
      className="relative h-auto inline-block"
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <button
        className={`px-4 py-2 mb-1 text-white rounded ${selectedButton ? colorMap[selectedButton] : 'bg-gray-500'}`}
      >
        {selectedButton ? `${selectedButton}` : 'Select Type'}
      </button>
      {showOptions && (
        <div className="absolute left-0 max-h-80 space-y-1 bg-white shadow-lg rounded overflow-y-auto">

<button onClick={handleReset}>Default</button>

         {Object.keys(colorMap).map((type) => (
                        <button
                            key={type}
                            className={`px-4 py-2 text-white rounded ${colorMap[type]} block w-full`}
                            onClick={() => handleSelect(type)}
                        >
                            {type}
                        </button>
                    ))}
                   
        </div>
      )}
    </div>
  );
};

export default HoverButtonMenu;
