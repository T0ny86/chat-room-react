
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Signup, Login, Chat } from './pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/' element={<Chat />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
