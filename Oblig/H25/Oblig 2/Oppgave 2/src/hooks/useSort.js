// src/hooks/useSort.js
import { useState } from "react";

export default function useSort(initialColumnID, initialDirection) {

  // stateverdier for å holde orden på sorteringsrekkefølgen
  const [columnName, setColumnName] = useState(initialColumnID);
  const [sortingDirection, setSortingDirection] = useState(initialDirection);

  // funksjon for å "toggle" kolonnesortering mellom ASC og DESC
  const toggleSort = (clickedColumnID) => {
    if (columnName === clickedColumnID) {
      // Hvis bruker trykker på samme kolonne, så flippes det til det motsatte, for eks fra ASC til DESC
      setSortingDirection((prev) => (prev === "ASC" ? "DESC" : "ASC"));
    } 
    
    else {
      // Hvis ny kolonne trykkes på, så veksles retning til DESC fordi standardrettning er ASC
      setColumnName(clickedColumnID);
      setSortingDirection("DESC");
    }
  };

  // returner de som separate verdier
  return [columnName, sortingDirection, toggleSort];
}
