import { useState } from "react";

export default function MyComponent() {
  const [name, setName] = useState("");
  const [tmpName, setTmpName] = useState(""); // midlertidig input-verdi
  const [age, setAge] = useState(0);
  const [isEmployed, setIsEmployed] = useState(false);

  const updateAge = () => {
    setAge(age + 1);
  };

  const toggleEmploymentStatus = () => {
    setIsEmployed(!isEmployed);
  };

  const updateName = (event) => {
    setTmpName(event.target.value); // oppdaterer bare den midlertidige staten
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setName(tmpName);   // først da oppdateres "ekte" name
      setTmpName("");     // tøm input-feltet etterpå
    }
  };

  return (
    <div className="info-container">
      <p>Name: {name}</p>
      <input
        type="text"
        value={tmpName}
        onChange={updateName}
        onKeyDown={handleKeyDown}
        placeholder="Please enter your name.."
      />

      <p>Age: {age}</p>
      <button onClick={updateAge}>Increment age</button>

      <p>Is employed: {isEmployed ? "Yes" : "No"}</p>
      <button onClick={toggleEmploymentStatus}>Toggle employment</button>
    </div>
  );
}
