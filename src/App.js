window.addEventListener('load', () => {
	window.ui = new UI();
	window.dataTask = new Data();
	const container = document.getElementById('App');

	if (window.formAction !== undefined) {
		window.ui.generateBody(window.formAction, container);
	} else {
		window.ui.generateBody('create', container);
	}
});