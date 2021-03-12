export class Form {
	constructor (type, taskId) {
		if (typeof type === 'string') {
			this.type = type;
			if (typeof taskId === 'number' && !isNaN(taskId)) {
				this.id = taskId;
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
	print (container, data) {
		if(this.id !== undefined) {
			var currentTask = data.findTask(this.id);
		} else {
			var currentTask = {
				name: '',
				description: ''
			};
		}
		const formElement = document.createElement('div');
		formElement.id = 'taskFormCard';
		formElement.className = 'card mb-4';
		formElement.innerHTML = `
			<div class="card-body">
				<h2 class="h4 mb-4">${this.title}</h2>
				<form action="#" class="form" id="taskForm" data-type="${this.type}" data-idtask="${(this.id !== undefined) ? this.id : ''}">
					<div class="form-group mb-3">
						<input type="text" name="taskName" class="form-control" placeholder="Nombre de la tarea" maxlength="50" value="${currentTask.name}">
					</div>
					<textarea name="taskDescription" class="form-control" rows="5" placeholder="¿De qué trata?" maxlength="200">${currentTask.description}</textarea>
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
			id: (task.form.dataset.idtask !== undefined) ? Number(task.form.dataset.idtask) : undefined,
			name: task.name.value,
			description: task.description.value,
		}
	}
	eventListener (app) {
		this.getDOM()
			.addEventListener('submit', (event) => {
				event.preventDefault();
				
				try {
					const form = event.target;
					let sentTask = this.getFormValues(this.getDOMTask());

					if (sentTask.name === '') {
						throw `Es necesario un <strong>nombre</strong> para '${form.dataset.type}' la tarea`;	
					}
					switch (form.dataset.type) {
						case 'create':
							if (app.data.addTask(sentTask)) {
								this.resetForm(event);
								app.ui.print({
									element: 'message',
									container: document.getElementById('messageBox'),
									text: 'Tarea creada <strong>exitosamente</strong>',
									type: 'success'
								});
								app.ui.print({
									element: 'list',
									container: document.querySelector('.list-container'),
									data: app.data,
								});
								app.ui.list.eventListener(app);
							}
						break;
						case 'update':
							if (typeof sentTask.id !== 'number' || isNaN(sentTask.id)) {
								throw "ERROR: Wrong id";
							}
							if (app.data.updateTask(sentTask)) {
								app.printCreateUI();
								app.ui.print({
									element: 'message',
									container: document.getElementById('messageBox'),
									text: 'Tarea modificada <strong>exitosamente</strong>',
									type: 'success'
								});
							}
						break;
						default:
							throw `ERROR: unknown form type '${form.dataset.type}'`;
					}
				} catch (error) {
					console.error(error);
					app.ui.print({
						element: 'message',
						container: document.getElementById('messageBox'),
						text: error,
						type: 'danger'
					})
				}
			});
	}
}