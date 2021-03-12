import {UI} from './components.js';
import {Data} from './data.js';
class App {
	constructor (idTask) {
		this.dataTask = new Data();
		this.getUI(idTask);
	}
	getUI (idTask) {
		this.ui = new UI(idTask);
	}
	printCreateUI () {
		this.getUI();
		this.ui.print({
			element: 'body',
			container: document.getElementById('App')
		});
		this.ui.print({
			element: 'form',
			container: document.querySelector('.form-container'),
			data: this.dataTask,
		});
		this.ui.print({
			element: 'list',
			container: document.querySelector('.list-container'),
			data: this.dataTask
		});
		this.ui.form.eventListener(this.ui, this, this.dataTask);
		this.ui.list.eventListener(this.ui, this);
	}
	printUpdateUI (idTask) {
		this.getUI(idTask);
		
		this.ui.print({
			element: 'body',
			container: document.getElementById('App')
		});
		this.ui.print({
			element: 'form',
			container: document.querySelector('.form-container'),
			data: this.dataTask,
		});
		this.ui.form.eventListener(this.ui, this, this.dataTask);
	}
	printDeleteUI (idTask) {
		this.getUI(idTask);

		try{
			if (this.dataTask.deleteTask(idTask)) {
				this.ui.print({
					element: 'list',
					container: document.querySelector('.list-container'),
					data: this.dataTask,
				});

				this.ui.list.eventListener(this.ui, this);
					this.ui.print({
						element: 'message',
						container: document.getElementById('messageBox'),
						type: 'success',
						text: '¡Tarea eliminada <strong>Exitosamente</strong>!',
					});
			} else {
				throw 'Sorry, Task could not be deleted.'
			}
		} catch (error) {
			console.error(error);
			this.ui.print({
				element: 'message',
				container: document.getElementById('messageBox'),
				type: 'danger',
				text: error,
			});
		}
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