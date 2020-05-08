import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() =>{
    axios.get('http://localhost:4000/api/projects')
      .then(response => {
        console.log(response.data);
        setData(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <div className="App">
      <h1>Project Records</h1>
      <div className="projects-container">
        {
          data.map(project => {
            return (
              <div 
                key={project.id} 
                className="project"
              >
                <h2>Project: {project.name}</h2>
                <p>{project.description}</p>
                <p>Completed: {project.completed}</p>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default App;
