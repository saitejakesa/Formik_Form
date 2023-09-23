import "./App.css";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Allpages from "./pages/Allpages";
import ProductList from "./pages/ProductList";
import Editpage from "./pages/Editpage";

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<ProductList/>}/>
        <Route path='/create' element={<Allpages/>}/>
        <Route path='/edit' element={<Editpage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
