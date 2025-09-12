import { useState } from 'react'
import MyComponent from './components/MyComponent'
import './App.css'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MyComponent/>
    </>
  )
}
