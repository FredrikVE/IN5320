import Student from './components/Student';
import './styles/App.css';

function App() {
  return (
    <div className="app-container">
      <Student name="Bob" age="30" isStudent={false}/>
      <Student name="Alcie" age="27" isStudent={true}/>
      <Student name="Kåre" age="29" isStudent={true}/>

    </div>

  );
}

export default App;
