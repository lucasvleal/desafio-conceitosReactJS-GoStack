import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories')
    .then(response => {
      setRepositories(response.data);
    });
  },[]);

  async function handleAddRepository() {
    const newRepository = {
      url: "https://github.com/lucasvleal",
      title: `Repositorio criado em ${Date.now()}`,
      techs: ["ReactJS, Node.js"]
    }

    const resp = await api.post('/repositories', newRepository);

    setRepositories([...repositories, resp.data]);
  }

  async function handleRemoveRepository(id) {
    const resp = await api.delete(`/repositories/${id}`);

    if (resp.status === 204) {
      const repositoryIndex = repositories.findIndex((repo) => repo.id === id);

      if (repositoryIndex > -1) {
        const arr = [...repositories];
        
        arr.splice(repositoryIndex, 1);
        setRepositories(arr);
      }
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repo => (
            <li key={repo.id}>
              {repo.title}

              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          ))
        }        
      </ul>      

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
