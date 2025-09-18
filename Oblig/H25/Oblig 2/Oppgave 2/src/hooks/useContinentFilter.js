// src/hooks/useContinentFilter.js
import { useState } from "react";

export default function useContinentFilter() {
  const [continents, setContinents] = useState([]);

  const toggleContinent = (name) => {
    setContinents((prev) => {
      const list = [...prev];
      const i = list.indexOf(name);

      if (i === -1) {
        list.push(name);
      } 
      
      else {
        list.splice(i, 1);
      }
      return list;
    });
  }

  return [ continents, toggleContinent, setContinents ];
}
