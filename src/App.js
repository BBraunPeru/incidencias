import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeI from './Pages/HomeI';
import AddInc from './Pages/AddInc';
import { MyProvider } from './ContexProvider';
import Aut from './Pages/Aut';
import { GlobalStyle } from './GlobalStyle';
function App() {
  return (
    <Router>
        <MyProvider>
          <GlobalStyle />
          <Routes>
            <Route index element={<Aut />} />
            <Route path='/home' element={<HomeI />} />
            <Route path='/add' element={<AddInc />} />
          </Routes>
        </MyProvider>
      </Router>
  );
}

export default App;
