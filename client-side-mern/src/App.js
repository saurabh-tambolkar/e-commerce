import './App.css';
import { Route,Routes,Link } from 'react-router-dom';
import Nav from "./components/Nav"
import Footer from "./components/Footer"
import Signup from './components/Signup';
import PrivateCompo from './components/PrivateCompo';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import Products from './components/Products';
import UpdateProd from './components/UpdateProd';

function App() {
  return (
    <>
    <Nav/>
      <Routes>
        
          <Route element={<PrivateCompo/>}>
            <Route exact path='/'element={<Products/>}/>
            <Route exact path='/add'element={<AddProduct/>}/>
            <Route exact path='/product/:id'element={<UpdateProd/>}/>
            <Route exact path='/profile'element={<h3>profile product component</h3>}/>
          </Route>

          <Route exact path='/login' element={<Login/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
