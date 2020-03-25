import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

import './styles.css';

const Profile = () => {
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();
  const ongId = localStorage.getItem("ongId");
  const ongName = localStorage.getItem("ongName");

  useEffect(() => {
    api.get("profile", {
      headers: {
        Authorization: ongId
      }
    })
      .then(response => {
        setIncidents(response.data)
      });
  }, [ongId]);

  const handleDeleteIncident = async (id) => {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });
      
      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (err) {
      alert("Something went wrong...");
    }
  }

  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span>Welcome, {ongName}</span>

        <Link className="primary-button" to="/incidents/new">
          Register a new case
        </Link>

        <button type="button" onClick={handleLogout}>
          <FiPower
            size={18}
            color="#e02041"
          />
        </button>
      </header>

      <h1>Registed Cases</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASE:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIPTION:</strong>
            <p>{incident.description}</p>

            <strong>VALUE:</strong>
            <p>{Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR" }).format(incident.value)}</p>

            <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;