//src/components/SearchBar.js
import { useState } from "react";

export default function SearchBar( { onSearch } ) {

    // State for å holde på inputverdien mens brukeren skriver
    const [inputValue, setInputValue ] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();       // hindrer at skjemaet refresher siden slik som er default for HTML-form
        onSearch(inputValue);    // sender verdien tilbake til App
    };

    return (
        <form onSubmit={handleSubmit} className="searchbar">
            <input 
            type="text"
            value={inputValue}
            onChange={(e)=> setInputValue(e.target.value)} //oppdater state for hvert tastetrykk
            placeholder="Search country..."             // Plassholdertekst som beskriver usecase
            />
            <button type="submit">Search</button>
        </form>
    );
}
