import * as React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Login from "./components/Login/Login"
import SignUp from './components/SingUp/SingUp';


class App extends React.Component{
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/singup" element={<SignUp/>}></Route>
        </Routes>
      </Router>
    );  
  }
}

export default App;
