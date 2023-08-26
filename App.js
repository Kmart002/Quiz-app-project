import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Play from './Components/Quiz/Play';
import Header from './Components/Quiz/Component/Header/Header'


function App() {
  return (
    <div>

    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/play' element={<Play/>} />
        <Route path='/header' element={<Header/>} />
    </Routes>

    </div>
  );
}

export default App;
