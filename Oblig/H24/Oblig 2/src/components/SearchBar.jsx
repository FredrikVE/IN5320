//src/components/SearchBar.jsx
import { useEffect, useState } from "react";

export default function SearchBar({
  valueDraft, onChangeDraft, onSubmit, // controlled
  suggestions, onChooseSuggestion,
  showReset, onReset
}) {
  const [hl, setHl] = useState(-1); // highlight index

  useEffect(() => { setHl(-1); }, [suggestions]);

  return (
    <form className="row gap" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <div style={{ position: "relative", display: "inline-block" }}>
        <input
          aria-label="Search"
          placeholder="Search"
          value={valueDraft}
          onChange={(e) => onChangeDraft(e.target.value)}
          onKeyDown={(e) => {
            if (!suggestions.length) return;
            if (e.key === "ArrowDown") { e.preventDefault(); setHl((hl + 1) % suggestions.length); }
            else if (e.key === "ArrowUp") { e.preventDefault(); setHl(hl <= 0 ? suggestions.length - 1 : hl - 1); }
            else if (e.key === "Enter" && hl >= 0) { e.preventDefault(); onChooseSuggestion(suggestions[hl]); }
            else if (e.key === "Escape") { onChangeDraft(""); }
          }}
        />
        <button type="submit">Search</button>

        {suggestions.length > 0 && (
          <ul className="suggest">
            {suggestions.map((name, idx) => (
              <li key={name}>
                <button
                  type="button"
                  className={idx === hl ? "active" : ""}
                  onMouseEnter={() => setHl(idx)}
                  onClick={() => onChooseSuggestion(name)}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showReset && (
        <button type="button" onClick={onReset} style={{ background: "#aaa", borderColor: "#aaa" }}>
          Tilbake
        </button>
      )}
    </form>
  );
}