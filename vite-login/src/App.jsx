
import './App.css'
import { Login } from './components/login.jsx'
import { Profile } from './components/profile.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from './components/register.jsx';
import { ShowProfile } from './components/showProfile.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Books } from './components/Profile/books';
import { Authores } from './components/Profile/Authores.jsx';
import { Name } from './components/Profile/name.jsx';
import { Layout } from './components/Layout.jsx';

function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<Profile />} >
            <Route path="" element={<Layout />} >
              <Route path="" element={<Name />} />
              <Route path="books" element={<Books />} />
              <Route path="authors" element={<Authores />} />
            </Route>
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/showProfile" element={<ShowProfile />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider >
  )
}

export default App
