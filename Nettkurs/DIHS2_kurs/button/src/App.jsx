import { useState } from "react";
import ButtonRow from "./components/ButtonRow.jsx";

export default function App() {
    const [clicked, setClicked] = useState('')

    return (
        <div style={{ padding: 40, textAlign: 'center' }}>
            <ButtonRow onSelect={setClicked} />

            {clicked && (
                <p style={{ marginTop: 30 }}>
                    You clicked the {clicked} button!
                </p>
            )}
        </div>
    )
}
