import './App.css'
import {  useFetch } from './hook/useFetch'

function App() {
  // const [data, setData] = useState('')
  const [data] = useFetch("https://jsonplaceholder.typicode.com/todos");

  return (
    <>
      {data &&
        data.map((item) => {
          return <p key={item.id}>{item.title}</p>;
        })}
    </>
  );


}
export default App
