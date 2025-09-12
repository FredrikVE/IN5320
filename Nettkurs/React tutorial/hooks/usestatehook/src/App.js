import './App.css';
import Counter from './components/CounterComponent';
import People from './components/People';

export default function App() {
  return (
    <div className='app-container'>
      <People/>
      <Counter/>
    </div>

  );
}