import React from 'react'


const SuggestionsList = (props: any) => {
    const {
      suggestions,
      inputValue,
      onSelectSuggestion,
      displaySuggestions,
      selectedSuggestion
    } = props;
  
    if (inputValue && displaySuggestions) {
      if (suggestions.length > 0) {
        return (
            <span  className='absolute user-input block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 bg-gray-50 border-t-0 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-es-lg rounded-ee-lg'>
                <ul className="suggestions-list ">
            {suggestions.map((suggestion:any, index:number) => {
              const isSelected = selectedSuggestion === index;
              const classname = `suggestion ${isSelected ? "selected" : ""}`;
              return (
                <li
                  key={index}
                  className={classname}
                  onClick={() => onSelectSuggestion(index)}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
            </span>
          
        );
      } else {
        return <div className='absolute user-input block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 bg-gray-50 border-t-0 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-es-lg rounded-ee-lg'>No suggestions available...</div>;
      }
    }
    return <></>;
  };
  const SearchSuggestion = () => {
    const [inputValue, setInputValue] = React.useState("");
    const [filteredSuggestions, setFilteredSuggestions] = React.useState<string[]>([]);
    const [selectedSuggestion, setSelectedSuggestion] = React.useState(0);
    const [displaySuggestions, setDisplaySuggestions] = React.useState(false);
    
  
    const suggestions = [
      "Oathbringer",
      "American Gods",
      "A Game of Thrones",
      "Prince of Thorns",
      "Assassin's Apprentice",
      "The Hero of Ages",
      "The Gunslinger"
    ];
  
    const onChange = (event:any) => {
      const value = event.target.value;
      setInputValue(value);
  
      const filteredSuggestions: string[] = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
  
      setFilteredSuggestions(filteredSuggestions);
      setDisplaySuggestions(true);
    };
  
    const onSelectSuggestion = (index:number) => {
      setSelectedSuggestion(index);
      setInputValue(filteredSuggestions[index]);
      setFilteredSuggestions([]);
      setDisplaySuggestions(false);
    };
  
    return (
      <div className='relative w-full sm:w-96'>
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input 
            type="search"
            id="search"
            onChange={onChange}
            value={inputValue} className={`user-input block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${!inputValue?.length || !displaySuggestions ?'rounded-lg':'rounded-ss-lg rounded-se-lg'}`} placeholder="Search" required />
            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
        <SuggestionsList
          inputValue={inputValue}
          selectedSuggestion={selectedSuggestion}
          onSelectSuggestion={onSelectSuggestion}
          displaySuggestions={displaySuggestions}
          suggestions={filteredSuggestions}
        />
      </div>
    );
  };

export default SearchSuggestion