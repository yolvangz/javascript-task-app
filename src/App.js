window.addEventListener('load', () => {
	const ui = new UI();
	const container = document.getElementById('App');
	const dataTask = new Task();

	if (window.formAction !== undefined) {
		ui.generateBody(window.formAction, container);
	} else {
		ui.generateBody('create', container);
	}
	console.log(new Task(0, 'una tarea', 'desc tarea'));
});