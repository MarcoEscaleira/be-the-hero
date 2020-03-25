import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

import './styles.css';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");

  const history = useHistory();

  const handleRegister = async (event) => {
    event.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      district
    }

    try {
      const response = await api.post("ongs", data);
    
      if (response.data.id) {
        alert(`Your access ID: ${response.data.id}`);
        history.push("/");
      }
    } catch(err) {
      alert("Something went wrong...")
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1>Register</h1>
          <p>Create your ONG (organization), sign in and help people find cases in the street of your ONG</p>
          
          <Link to="/" className="back-link">
            <FiArrowLeft
              size={16}
              color="#E02041"
            />
            I don't have an account
          </Link>
        </section>
        
        <form onSubmit={handleRegister}>
          <input 
            type="text" 
            placeholder="Name of the ONG"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input 
            type="email" 
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input 
            type="text" 
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />
          
          <div className="input-group">
            <input 
              type="text" 
              placeholder="City" 
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="District" 
              value={district}
              onChange={e => setDistrict(e.target.value)}
              style={{
                width: 80
              }} 
            />
          </div>

          <button className="primary-button" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;