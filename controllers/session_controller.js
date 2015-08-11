//MW de autorizaci√n de accesos HTTP restringidos
exports.loginRequired = function (req, res, next){
	if(req.session.user){
		next();
	}else{
		res.redirect('/login');
	}
}

//GET /login --Formulario de login
exports.new = function (req, res){
	var errors = req.session.errors ||{};
	req.session.errors = {};

	res.render('sessions/new', {errors:errors});
};

//POST /login --Crear la session
exports.create = function (req, res){
	var login = req.body.login;
	var password = req.body.password;

	var userController = require ('./user_controller.js');
	userController.autenticar(login, password, function(error, user){
		if(error){ //si hay error retornamos mensajes de erorr de sesi√n
			req.session.errors = [{"message": 'Se ha producido un error: '+error}];
			res.redirect("/login");
			return;
		}

		//Crear req.session.user y guardar campos id y username
		//La sessi√n se define por la existencia de: req.session.user
		req.session.user = {id:user.id, username:user.username};

		//Guardamos la hora de inicio de sesi√n al hacer login
		req.session.startTime = new Date().getTime(),
		req.session.autoLogout = false; //control de si la sesi√n se ha perdido por timeout


		res.redirect(req.session.redir.toString()); //redirecci√≥n a path anterior a login
	});
};

//DELETE /logout -- Destruir sesi√n
exports.destroy = function (req, res){
	delete req.session.user;
	if (req.session.autoLogout == true){
		res.redirect("/login"); //vamos a la p√gina de login y mostramos mensaje timeout
	}else{
		res.redirect(req.session.redir.toString()); // redirect a path anterior a login
	}
};
