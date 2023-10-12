import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomeI from './Pages/HomeI';
import AddInc from './Pages/AddInc';
import { MyProvider } from './ContexProvider';
function App() {
  return (
    <div style={{ backgroundColor: "#E5E5E5",display:"flex",minHeight:"100vh",justifyContent:"center",alignItems:"flex-start" }}>
      <Router>
        <MyProvider>
          <Routes>
            <Route index element={<HomeI />} />
            <Route path='/add' element={<AddInc />} />
          </Routes>
        </MyProvider>
      </Router>
    </div>
  );
}

export default App;
