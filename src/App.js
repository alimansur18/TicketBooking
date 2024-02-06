
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage/Index'
import SignUp from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import MovieDetailPage from './pages/MovieDetailPage/Index'
import ProtectRoutes from './components/Routes/ProtectRoutes'
import Navbar from './components/Navbar/Index'
import Footer from './components/Footer/Index'
import SeatSelectPage from './pages/SeatSelectPage/Index'
import ShowSelectPage from './pages/ShowSelectPage/Index'
import BookingPage from './pages/BookingPage/Index'
import ProfilePage from './pages/ProfilePage/Index'


function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path='/movies/:id' element={<MovieDetailPage />} />
        <Route path='/movieshows/:id' element={<ProtectRoutes Component={ ShowSelectPage } />} />
        <Route path='/seats/:movie_id/:theatre_id' element={<ProtectRoutes Component={ SeatSelectPage } />} />
        <Route path='/booking/:id' element={<ProtectRoutes Component={ BookingPage } />} />
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/user/profile' element={<ProtectRoutes Component={ ProfilePage } />}/>
        <Route path='*' element={<h1>404</h1>}/>  
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
