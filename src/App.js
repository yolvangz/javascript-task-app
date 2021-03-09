import {UI} from './components.js';
import {Data} from './data.js';
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
			container: document.querySelector('.form-container'),
			data: window.dataTask,
		});
		window.ui.print({
			element: 'list',
			container: document.querySelector('.list-container'),
			data: window.dataTask
		});
		window.ui.form.eventListener(window.ui, this, window.dataTask);
		window.ui.list.eventListener(window.ui, this);
	}
	printUpdateUI (idTask) {
		this.getModules(idTask);
		
		window.ui.print({
			element: 'body',
			container: document.getElementById('App')
		});
		window.ui.print({
			element: 'form',
			container: document.querySelector('.form-container'),
			data: window.dataTask,
		});
		window.ui.form.eventListener(window.ui, this, window.dataTask);
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