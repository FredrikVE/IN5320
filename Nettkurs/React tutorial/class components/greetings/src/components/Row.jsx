import "../styles/Card.css";

export default function Row( { label, children }) {
    return (
        <div className="row">
            <div className="row-label"> {label} </div>
            <div className="row-value"> {children} </div>
        </div>
    );
}