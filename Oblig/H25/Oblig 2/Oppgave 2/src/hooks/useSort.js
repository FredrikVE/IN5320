//src/hooks/useSort.js
import { useState } from "react";

export default function useSort(initialKey = null, initialDir = null) {
  const [order, setOrder] = useState({ key: initialKey, dir: initialDir });

  const toggleSort = (key) => {
    setOrder((prev) => {
      if (prev.key === key) {
        return { key, dir: prev.dir === "ASC" ? "DESC" : "ASC" };
      }
      return { key, dir: "ASC" };
    });
  };

  return [order, toggleSort];
}
