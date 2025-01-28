
import { QueryClient, QueryClientProvider } from 'react-query';
import { Register } from './Components/Register';
import { UserUpdate } from './Components/UserUpdate';
import { BrowserRouter, Routes, Route } from "react-router";
import { Home } from './Components/Home';
// import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/userUpdate" element={<UserUpdate />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
  );


}
export default App
