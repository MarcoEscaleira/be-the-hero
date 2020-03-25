import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

import './styles.css';

const Profile = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const history = useHistory();

  const ongId = localStorage.getItem("ongId");

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!title || !description || !value) {
      alert("Please provide a title, description and value");
      return;
    }

    const data = {
      title,
      description,
      value
    }

    try {
      const response = await api.post("incidents", data, {
        headers: {
          Authorization: ongId
        }
      });
    
      if (response.data.id) {
        alert("Your incident has been created");
        history.push("/profile");
      }
    } catch(err) {
      alert("Something went wrong...")
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1>Register a new case</h1>
          <p>Describe the case datailed to find an hero to solve it</p>
          
          <Link to="/profile" className="back-link">
            <FiArrowLeft
              size={16}
              color="#E02041"
            />
            Back to home
          </Link>
        </section>
        
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Case Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea 
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="0€"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button className="primary-button" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;