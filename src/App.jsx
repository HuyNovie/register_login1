import Login from "./from_login/Login.jsx";
import Register from "./from_register/Register.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes> 
         <Route index element={<Login/>} />   
          <Route path="login" element={<Login/>} />   
          <Route path="register" element={<Register/>} />      
      </Routes>
    </BrowserRouter>
         
    </div>
  );
}

export default App;
