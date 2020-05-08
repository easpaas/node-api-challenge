const express = require('express');
const projectDB = require('../data/helpers/projectModel.js');
const actionDB = require('../data/helpers/actionModel');
const router = express.Router();


// Return all actions from db
router.get('/', (req, res) => {
  actionDB.get()
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ errorMessage: `Error retrieving lists of actions`});
    });
});

// Return action by id
router.get('/:id', (req,res) => {
  const id = req.params.id;
  actionDB.get(id)
    .then(action => {
      console.log(action);
      res.status(200).json(action);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: `Error retrieving project id ${id}.` });
    });
});

// // Return project actions by project id
// router.get('/:id/projects', validateProjectId, (req,res) => {
//   const id = req.params.id;
//   projectDB.getProjectActions(id)
//     .then(project => {
//       console.log(project);
//       res.status(200).json(project);
//     })
//     .catch(error => {
//       console.log(error);
//       res.status(500).json({ errorMessage: `Error retrieving project id ${id}.` });
//     });
// });

// // Add new project 
// router.post('/', (req, res) => {
//   const project = req.body;
//   projectDB.insert(project)
//     .then(project => {
//       console.log(project)
//       res.status(201).json(project);
//     })
//     .catch(error => {
//       console.log(error)
//       res.status(500).json({ errorMessage: `Error inserting new project.` });
//     });
// });

// // Edit existing project by id
// router.put('/:id', validateProjectId, (req, res) => {
//   const id = req.params.id;
//   const changes = req.body;
//   projectDB.update(id, changes)
//     .then(update => {
//       console.log(update)
//       res.status(200).json(update)
//     })
//     .catch(error => {
//       res.status(500).json({ errorMessage: `Error retrieving and updating project with id ${id}.` });
//     });
// });

// // Remove project by id
// router.delete('/:id', validateProjectId, (req, res) => {
//   const id = req.params.id;
//   projectDB.remove(id)
//     .then(success => {
//       console.log(success)
//       res.status(204).json(success);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// });


// Middleware 
function validateProjectId(req, res, next){
  const id = req.params.id;
  projectDB.get(id)
    .then(success => {
      req.project = success;
      next();
    })
}

module.exports = router;
