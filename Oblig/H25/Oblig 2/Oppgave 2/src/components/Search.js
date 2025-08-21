import { useState } from "react";

export default function Search( { onSearch } ) {
    const [inputValue, setInputValue ] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault(); // hindre reload
        onSearch(inputValue);    // sender verdien tilbake til App
    };


    return (
        <form onSubmit={handleSubmit}>
            <input 
            type="text"
            value={inputValue}
            onChange={(e)=> setInputValue(e.target.value)} //oppdater state for hvert tastetrykk
            placeholder="Search country..."
            />
            <button type="submit">Search</button>
        </form>
    );
}
