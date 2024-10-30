import React from "react";
import { Routes,Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import Form from "./component/Form";
import Record from "./component/Record";
// import Login from "./component/Login";
import Pdf from "./component/Pdf";
// import Upload from "./component/Upload";
import Billing from "./component/Billing";



function App() {
  return (
    <div className="App">
       <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/formsz' element={<Form/>}/>
          <Route path='/records' element={<Record/>}/>
          <Route path='/pdf' element={<Pdf/>}/>
          <Route path="/billing" element={<Billing />}/>
        </Routes>
    </div>
  );
}

export default App;
