import { useState } from 'react';

// Interface
type SearchBarProps = {
  nameHotel: (hotel: string) => void;
};

const SearchBar = ({ nameHotel }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Event of the input text
  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const textInput = e.target.value;
    setSearchTerm(textInput);
    nameHotel(textInput);
  };

  return (
    <>
      <div className="flex w-1/2 flex-row items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputSearch}
          className="w-full rounded-l-sm border border-gray-200 p-1 text-sm focus:outline-none"
          placeholder="Escriba el nombre del hotel..."
        />
      </div>
    </>
  );
};

export default SearchBar;
