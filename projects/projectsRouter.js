const express = require('express');
const projectDB = require('../data/helpers/projectModel.js');
// const postDB = require('../posts/postDb.js');
const router = express.Router();


// Return all projects from db
router.get('/', (req, res) => {
  projectDB.get()
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ errorMessage: `Error retrieving lists of projects`});
    });
});

// Return project by id
router.get('/:id', (req,res) => {
  const id = req.params.id;
  projectDB.get(id)
    .then(project => {
      console.log(project);
      res.status(200).json(project);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: `Error retrieving project id ${id}.` });
    });
});

// Add new project 
router.post('/', (req, res) => {
  const project = req.body;
  projectDB.insert(project)
    .then(project => {
      console.log(project)
      res.status(201).json(project);
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ errorMessage: `Error inserting new project.` });
    });
});

// Edit existing project by id
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  projectDB.update(id, changes)
    .then(update => {
      console.log(update)
      res.status(200).json(update)
    })
    .catch(error => {
      res.status(500).json({ errorMessage: `Error retrieving and updating project with id ${id}.` });
    });
})


// TODO middleware here

module.exports = router;