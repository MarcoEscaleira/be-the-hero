import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

import './styles.css';

const Login = () => {
  const [id, setId] = useState("");
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      id
    };

    try {
      const response = await api.post("session", data);

      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", response.data.name);

      history.push("/profile");
    } catch(err) {
      alert("Something went wrong...");
    }
  }

  return (
    <div className="login-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero"/>

        <form onSubmit={handleLogin}>
          <h1>Do your login</h1>
          <input 
            type="text" 
            placeholder="Your ID" 
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button 
            type="submit" 
            className="primary-button"
          >
            Sign in
          </button>
          <Link to="/register" className="back-link">
            <FiLogIn
              size={16}
              color="#E02041"
            />
            I don't have an account
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes"/>
    </div>
  );
};

export default Login;