import React, { useState } from "react";
import Login from "../components/Login.jsx";
import Register from "../components/Register";
import background from '../images/background.gif'

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
      <div className="h-screen flex items-center justify-center text-gray-900 bg-cover bg-center" style={{ backgroundImage: `url(${background})` }}>
        <div className="text-center flex min-h-screen items-center justify-center text-gray-900 bg-cover bg-rgb-203-167-181">
          {
            currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
          }
        </div>
      </div>
  );
}

export default App;