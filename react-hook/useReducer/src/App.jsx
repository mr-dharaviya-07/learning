
import { useReducer } from 'react'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  
  const reducer = (state, action) => {
    
    if(action.type === 'incerment'){
      return state + 1; 
    }
    if(action.type === 'decerment'){
      return state - 1;
    }
  }
  const [count , dispach] = useReducer(reducer, 0)

  return (
    <>
    <h1>{count}</h1>
    <button onClick={()=>dispach({type: "incerment"})} style={{margin: "5px"}} > Incerment</button> 
    <button onClick={()=>dispach({type: "decerment"})} > Decerment</button>
    </>
  )
}

export default App
