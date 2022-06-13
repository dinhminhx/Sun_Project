import React from "react";
import {BrowserRouter as Router , Routes,Route} from "react-router-dom"
import Restautant from './pages/Restaurant'
import Add from './pages/Add'
import Edit from './pages/Edit'
import Show from "./pages/Show";
import Login from "./pages/Login";

function App() {
  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Restautant/>} />
          <Route  path="/Login" element={<Login/>} />
          <Route path="/Add" element={<Add/>} />
          <Route path="/Edit/:id" element={<Edit/>} />
          <Route path="/Show/:id" element={<Show/>} />
        </Routes>
      </Router>
  );
}

export default App;
