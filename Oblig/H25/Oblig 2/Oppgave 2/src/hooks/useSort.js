// src/hooks/useSort.js
import { useState } from "react";

export default function useSort(initialColumnID, initialDirection) {
  // state for å holde orden på sorteringsrekkefølgen
  const [order, setOrder] = useState({
    columnName: initialColumnID,
    sortingDirection: initialDirection,
  });

  const toggleSort = (clickedColumnID) => {
    setOrder((prev) => {

      // Hvis bruker trykker på samme kolonne, så flippes det til det motsatte, for eks fra ASC til DESC
      if (prev.columnName === clickedColumnID) {
        const oppositeDirection = prev.sortingDirection === "ASC" ? "DESC" : "ASC";
        return { columnName: clickedColumnID, sortingDirection: oppositeDirection };
      } 

      // Hvis ny kolonne trykkes på, så veksles retning til DESC fordi standardrettning er ASC
      else {
        return { columnName: clickedColumnID, sortingDirection: "DESC" };
      }
    });
  };

  return [order, toggleSort];
}
