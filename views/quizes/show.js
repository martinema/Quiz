<form method ="get" action="/quizes/<%= quiz.id %>/answer">
	Pregunta: <%= quiz.pregunta %> <br/>
	<input type="text" name="respuesta" value="Respuesta"/>
	<input type="submit" name="Enviar />
</form>
