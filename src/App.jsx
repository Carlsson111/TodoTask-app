import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";


function App() {
  
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-2 p-0">
          <Sidebar />
        </div>

        {/* Main */}
        <div className="col-10 p-4">
          <Header />
          <TodoForm 
      
      />
          <TodoList
      />
        </div>
      </div>
    </div>
  );
}

export default App;