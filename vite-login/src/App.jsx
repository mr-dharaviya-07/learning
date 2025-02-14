
import './App.css'
import { Login } from './components/login.jsx'
import { Profile } from './components/Dashboard/profile.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from './components/register.jsx';
import { ShowProfile } from './components/Dashboard/Footer/showProfile.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Books } from './components/Dashboard/Table/Book/books.jsx';
import { Authores } from './components/Dashboard/Table/Author/Authores.jsx';
import { DashboardName } from './components/Dashboard/Main/dashboardName.jsx';
import { Layout } from './components/Dashboard/Layout.jsx';

function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<Profile />} >
            <Route path="" element={<Layout />} >
              <Route path="" element={<DashboardName />} />
              <Route path="books" element={<Books />} />
              <Route path="authors" element={<Authores />} />
              <Route path="showProfile" element={<ShowProfile />} />
            </Route>
          </Route>
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider >
  )
}

export default App
