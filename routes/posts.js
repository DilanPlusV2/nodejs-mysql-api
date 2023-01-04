const express = require('express');
const postController = require('../controllers/post.controller');
const post2Controller = require('../controllers/post2.controller');
const checkAuthMiddleware = require('../middleware/check-auth');
const router = express.Router();
//Berely
router.post("/AgendaB/", postController.save);
router.get("/AgendaB/", postController.index);
router.get("/AgendaB/:id", postController.show);
router.put("/AgendaB/:id", postController.update);
router.delete("/AgendaB/:id", postController.destroy);
router.get("/AgendaB/Buscar/:nombres", postController.Mostrar);

//Kelly
router.post("/AgendaK/", post2Controller.save);
router.get("/AgendaK/", post2Controller.index);
router.get("/AgendaK/:id", post2Controller.show);
router.put("/AgendaK/:id", post2Controller.update);
router.delete("/AgendaK/:id", post2Controller.destroy);
router.get("/AgendaK/Buscar/:nombres", post2Controller.Mostrar);
module.exports = router;