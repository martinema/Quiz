module.exports = function (sequelize, DataTypes){
	return sequelize.define(
		'Comment',
		{texto:{
			type: DataTypes.STRING, 
			validate:{notEmpty:{msg: "->Falta comentario"}}
			}
		}, 
		'Publicar',
		{publicado: {
			type: DataTypes.BOOLEAN, 
			defaultValue: false
			}
		}
	);
}
