
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/' element={<Chat />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
