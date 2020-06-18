import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=> {
    api.get('/repositories').then(({data}) => {
      setRepositories(data);
    })
  }, []);

  async function handleAddRepository() {
      api.post('/repositories',{
        title: `Test title ${Date.now()}`,
        url: "http://github.com/daniele",
        techs: ["Node", "React"]
      }).then(({data}) => {
        setRepositories([...repositories, data]);
      });


  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(response => {
      if(response.status === 204){
        const filtered = repositories.filter(repository => repository.id !== id);

        setRepositories(filtered);
      }
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories?.map(repository => 
        <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li> 
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
