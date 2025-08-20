import { useState } from "react";


function Search( { onSearch } ) {
    const [inputValue, setInputValue] = useState("");

    const handleClick = () => {
        onSearch(inputValue);       //kaller callback fra App.js
    };

    return(
        <div>
            <input 
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search for country..."
            />
            <button onClick={handleClick}>Search</button>
        </div>
    );
}

export default Search;
