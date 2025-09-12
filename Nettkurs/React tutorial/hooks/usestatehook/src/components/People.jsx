import { useState } from "react";

// Startverdier for en person
const INITIAL_PERSON = {
  name: "",
  age: 0,
  isEmployed: false,
};

export default function People() {
  const [person, setPerson] = useState(INITIAL_PERSON);
  const [inputName, setInputName] = useState("");

  const addPerson = () => {
    setPerson(prev => ({ ...prev, name: inputName }));
    setInputName("");
  };

  const incrementAge = () => {
    setPerson(prev => ({ ...prev, age: prev.age + 1 }));
  };

  const resetPerson = () => {
    setPerson(INITIAL_PERSON);
    setInputName("");
  };

  // 🟢 Toggle-funksjon for isEmployed
  const toggleEmployment = () => {
    setPerson(prev => ({ ...prev, isEmployed: !prev.isEmployed }));
  };

  return (
    <div>
      <h1>Person Info</h1>

      <label>
        Name:
        <input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder="Skriv inn navn"
        />
      </label>
      <button onClick={addPerson}>Add person</button>

      <p>Name: {person.name}</p>
      <p>Age: {person.age}</p>
      <button onClick={incrementAge}>Increase Age</button>

      <p>Is employed: {person.isEmployed ? "Yes" : "No"}</p>
      <button onClick={toggleEmployment}>Toggle Employment</button>

      <br /><br />
      <button onClick={resetPerson}>Reset person</button>
    </div>
  );
}
