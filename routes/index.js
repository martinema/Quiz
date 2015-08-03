var express = require('express');
var router = express.Router();
var quizController = require ('../controllers/quiz_controller.js');
var commentController = require('../controllers/comment_controller.js');
var sessionController = require('../controllers/session_controller.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

//Autoload de comandos con :quizId
router.param('quizId', quizController.load); //autoload :quizId
router.param('commentId', commentController.load); //autoload: commentId

//Definici√n de rutas de ses√√n
router.get('/login', sessionController.new); //formulario login
router.post('/login', sessionController.create); //crear sessi√n
router.get('/logout', sessionController.destroy); //destruir sessi√n

//Definici√n de rutas de /quizes
router.get('/quizes', quizController.index);
router.get ('/quizes/:quizId(\\d+)', quizController.show);
router.get ('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get ('/quizes/new', sessionController.loginRequired, quizController.new);
router.post ('/quizes/create', sessionController.loginRequired,  quizController.create);
router.get ('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired,  quizController.edit);
router.put ('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.destroy);

//Definici√n de rutas de cometnarios
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', 
		sessionController.loginRequired, commentController.publish);

//Definici√n de rutas de autor
router.get('/author', function(req, res) {
  res.render('author', {errors:[]});
});
module.exports = router;
