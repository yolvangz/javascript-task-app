class App {
	getModules (idTask) {
		window.ui = new UI(idTask);
		window.dataTask = new Data();
	}
	printCreateUI () {
		this.getModules();
		window.ui.print({
			element: 'body',
			container: document.getElementById('App')
		});
		window.ui.print({
			element: 'form',
			container: document.querySelector('.form-container')
		});
		window.ui.print({
			element: 'list',
			container: document.querySelector('.list-container')
		});
	}
	printUpdateUI (idTask) {
		this.getModules(idTask);
		
		window.ui.print({
			element: 'body',
			container: document.getElementById('App')
		});
		window.ui.print({
			element: 'form',
			container: document.querySelector('.form-container')
		});
	}
}

window.addEventListener('load', () => {
	try{
		const app = new App();
		app.printCreateUI();
	} catch (error) {
		console.error(error);
	}
});