export class Form {
	constructor (type, taskId) {
		if (typeof type === 'string') {
			this.type = type;
			if (typeof id === 'number' && !isNaN(id)) {
				this.id = id;
			}
			switch (type) {
				case 'create':
					this.title = 'Crear una nueva tarea';
					break;
				case 'update':
					this.title = 'Editar tarea';
					break;
				default:
					this.title = '';
			}
		} else {
			throw "Form component couldn't be created: wrong constructor parameter";
		}
	}
	print (container) {
		const formElement = document.createElement('div');
		formElement.id = 'taskFormCard';
		formElement.className = 'card mb-4';
		formElement.innerHTML = `
			<div class="card-body">
				<h2 class="h4 mb-4">${this.title}</h2>
				<form action="#" class="form" id="taskForm" data-type="${this.type}" data-idtask="${(this.id) ? this.id : ''}">
					<div class="form-group mb-3">
						<input type="text" name="taskName" class="form-control" placeholder="Nombre de la tarea" maxlength="50">
					</div>
					<textarea name="taskDescription" class="form-control" rows="5" placeholder="¿De qué trata?" maxlength="200"></textarea>
					<div class="form-group mb-3"></div>
					<button class="form-control btn btn-lg btn-success btn-block" type="submit">Guardar tarea</button>
				</form>
			</div>
		`;

		container.innerHTML = '';
		container.appendChild(formElement);
	}
	resetForm (event) {
		event.target.reset();
	}
	getDOM () {
		return document.getElementById('taskForm');
	}
	getDOMTask (container = document) {
		return {
			form: container.querySelector('#taskForm'),
			name: container.querySelector('.form-control[name=taskName]'),
			description: container.querySelector('.form-control[name=taskDescription]'),
		};
	}
	getFormValues (task) {
		return {
			id: (task.form.dataset.idtask) ? task.form.dataset.idtask : undefined,
			name: task.name.value,
			description: task.description.value,
		}
	}
	eventListener (ui) {
		this.getDOM()
			.addEventListener('submit', (event) => {
				event.preventDefault();
				
				try {
					const form = event.target;
					let task = this.getFormValues(this.getDOMTask());

					if (task.name === '') {
						throw `Es necesario un <strong>nombre</strong> para '${form.dataset.type}' la tarea`;	
					}
					switch (form.dataset.type) {
						case 'create':
							ui.print({
								element: 'message',
								container: document.getElementById('messageBox'),
								text: 'Tarea creada <strong>exitosamente</strong>',
								type: 'success'
							})
						break;
						case 'update':
							ui.print({
								element: 'message',
								container: document.getElementById('messageBox'),
								text: 'Tarea modificada <strong>exitosamente</strong>',
								type: 'success'
							})
						break;
						default:
							throw `ERROR: unknown form type '${form.dataset.type}'`;
					}
				} catch (error) {
					console.error(error);
					ui.print({
						element: 'message',
						container: document.getElementById('messageBox'),
						text: error,
						type: 'danger'
					})
				}
			});
	}
}