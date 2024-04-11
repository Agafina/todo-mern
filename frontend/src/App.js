import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import NavBar from "./components/Navbar";
import Calender from "./components/Calender";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={user ? <Home />: <Navigate to= '/login' />}/>
          <Route path='/login' element={!user ? <Login /> : <Navigate to= '/' />}/>
          <Route path='/register' element={!user ? <Signup />: <Navigate to= '/' />}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
