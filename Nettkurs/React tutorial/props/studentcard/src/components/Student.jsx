import "../styles/student.css"

export default function Student(props) {
    return(
        <div className="student">

            <p>
                <span className="label">Name: </span>
                <span>{props.name} </span>
            </p>

            <p>
                <span className="label">Age:</span>
                <span>{props.age}</span>
            </p>

            <p>
                <span className="label">Student: </span>
                <span>{props.isStudent ? "Yes" : "No"}</span> 
            </p>
        </div>
    );
}