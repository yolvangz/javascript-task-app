class HTML {
	constructor() {
		this.create = `
			<div class="col-12">
				<!-- Here will Go the messages -->
				<div id="messageBox"></div>
			</div>
			<aside class="col col-md-4">
				<div class="card mb-4" id="taskFormCard">
					<div class="card-body">
						<h2 class="h4 mb-4">Crea una nueva tarea:</h2>
						<form action="#" class="form" id="taskForm" data-type="create">
							<div class="form-group mb-3">
								<input type="text" name="taskName" class="form-control" placeholder="Nombre de la tarea">
							</div>
								<textarea name="taskDescription" class="form-control" rows="5" placeholder="¿De qué trata?"></textarea>
							<div class="form-group mb-3"></div>
							<button class="form-control btn btn-lg btn-success btn-block" name="save_task">Guardar tarea</button>
						</form>
					</div>
				</div>
			</aside>
			<section class="col">
				<div class="card">
					<div class="card-body  table-responsive-md">
						<table class="table table-striped">
							<thead>
								<th>Título</th>
								<th>Descripción</th>
								<th>Creado en</th>
								<th>Acciones</th>
							</thead>
							<tbody id="taskList">
							</tbody>
						</table>
					</div>
				</div>
			</section>
		`;
		this.update = `
			<div class="col-12">
				<!-- Here will Go the messages -->
				<div id="messageBox"></div>
			</div>
			<div class="col-md-5 mx-auto">
				<div class="card">
					<div class="card-body">
						<h2 class="text-center fw-normal">Editar Tarea</h2>
						<form action="#" class="form" id="taskForm" data-type="update" data-idtask="">
							<div class="form-group mt-3 mb-4">
								<label for="taskName" class="form-label">Nombre de la tarea</label>
								<input type="text" name="taskName" id="taskName" class="form-control" required>
							</div>
							<div class="form-group mb-4">
								<label for="taskDescription" class="form-label">Descripción</label>
								<textarea name="taskDescription"rows="5" id="taskDescription" class="form-control" required></textarea>
							</div>
							<button class="form-control btn btn-lg btn-success btn-block" name="update_task">Guardar tarea</button>
						</form>
					</div>
				</div>
			</div>
		`;
		this.delete = `
			
		`;
	}
}

class PrintMethods {
	constructor (prototype) {
		this.prototype = prototype;
	}
	body (action) {
		this.prototype.container.innerHTML = '';

		const element = document.createElement('div');
		element.className = 'row';
		element.innerHTML = this.prototype[action];
		this.prototype.container.appendChild(element);
		if (action === 'create') {
			this.taskList();
		}
		if(window.message) {
			this.message(window.message.message, window.message.type);
		}
		this.prototype.addDOMEvents(action);
	}
	taskList () {
		const list = document.getElementById('taskList');
		list.innerHTML = '';
		if (window.dataTask.data.length > 0) {
			window.dataTask.data.forEach((task) => {
				this.prototype.addTask(list, task);
			});
		} else {
			this.prototype.addTask(list);
		}
	}
	message (text, type) {
		const element = document.createElement('div');
		const container = document.getElementById('messageBox');
		const app = document.querySelector('#taskFormCard');

		element.className = `alert alert-${type} alert-dismissible fade show`;
		element.role = 'alert';
		element.innerHTML = `
			${text}
			<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
		`;
		// Showing in DOM
		container.appendChild(element);

		setTimeout(() => {
			let alert = new bootstrap.Alert(document.querySelector('.alert'));
			alert.close();
		}, 3000);
	}
}

class UI extends HTML {
	constructor () {
		super();
		try {
			this.container = document.getElementById('App');
			this.print = new PrintMethods(this);
			if (this.container === null) {
				throw 'ERROR: Application container was not found';
			}
		} catch (error) {
			return console.error(error);
		}
	}
	// Printing DOM HTML methods
	// =================================
	addTask (taskList, task = null) {
		const element = document.createElement('tr');
		element.className = 'task-row';
		if (task === null) {
			element.innerHTML = `
				<td colspan="4" class="text-center">¡Felicidades! No tienes tareas.</td>
			`;
		} else {
			element.innerHTML = `
				<td>${task.name}</td>
				<td>${task.description}</td>
				<td>${this.formatDate(task.createdDate)}</td>
				<td>
					<button class="btn btn-secondary mb-1 taskAction" name="update" title="Editar" data-idtask="${task.id}">
						<i class="bi bi-pencil-fill"></i>
					</button>
					<button class="btn btn-danger mb-1 taskAction" name="delete" title="Eliminar" data-idtask="${task.id}">
						<i class="bi bi-trash"></i>
					</button>
				</td>
			`;
		}
		taskList.appendChild(element);
	}
	
	// Utilities methods
	// =================================
	
	submitCurrentTaskToForm (id) {
		console.log(id);
		const form = document.getElementById('taskForm');
		const currentTask = window.dataTask.findTask(id);

		let task = {
			name: form.querySelector('.form-control[name=taskName]'),
			description: form.querySelector('.form-control[name=taskDescription]'),
		};
		if (currentTask !== undefined) {
			for (let property in currentTask) {
				if (property === 'id') {
					form.dataset.idtask = currentTask[property];
				} else if (property !== 'createdDate') {
					task[property].value = currentTask[property];
				}
			}
		} else {
			throw 'Sorry, the id does not match to any task';
		}
	}
	resetForm (event) {
		event.target.reset();
	}
	formatDate (timestamp) {
		const date = new Date(timestamp);
		return `${date.getFullYear()}-${(date.getMonth())+1}-${date.getDate()}`;
	}
	// DOM Events methods
	// =================================
	addDOMEvents (action) {
		// On Submit new task
		switch (action) {
			case 'create':
				document.getElementById('taskList')
					.addEventListener('click', (event) => {
						let buttonTag = event.target;
						while (!buttonTag.name && buttonTag.id !== 'taskList') {
							buttonTag = buttonTag.parentElement;
						}
						try {

							let idTask = Number(buttonTag.dataset.idtask);
							if (buttonTag.name === 'delete') {	
								window.dataTask.deleteTask(idTask);
								this.print.taskList();
							this.print.message('¡Tarea eliminada <strong>Exitosamente</strong>!', 'success');
							} else if (buttonTag.name === 'update') {
								this.print.body('update');
								this.submitCurrentTaskToForm(idTask);
							}

						} catch (error) {
							console.error(error);
							return this.print.message(`<strong>¡Ups!</strong>, ${error}`, 'danger');	
						}
					});
			default:
				document.getElementById('taskForm')
					.addEventListener('submit', (event) => {
						event.preventDefault();
						const form = event.target;
						let task = {
							id: Number(form.dataset.idtask),
							name: form.querySelector('.form-control[name=taskName]').value,
							description: form.querySelector('.form-control[name=taskDescription]').value,
						};


						try {
							if (task.name === '' || task.description === '') {
								throw `Faltan datos para ${((form.dataset.type === 'create') ? 'crear' : 'modificar')} la tarea`;
							}

							switch (form.dataset.type) {
								case 'create':
									window.dataTask.addTask(task);
									this.print.message('¡Tarea creada <strong>Exitosamente</strong>!', 'success');
									this.resetForm(event);
									break;
								case 'update':
									console.log(task.id);
									if (typeof task.id !== 'number' || isNaN(task.id)) {
										throw "ERROR: Wrong id";
									} else {	
										window.dataTask.updateTask(task);
										window.message = {
											message: '¡Tarea actualizada <strong>Exitosamente</strong>!',
											type: 'success'
										};
										this.print.body('create');
									}
									break;
							}
							
						} catch(error) {
							console.error(error);
							return this.print.message(`<strong>¡Ups!</strong>, ${error}`, 'danger');
						}
						this.print.taskList();
					});
		}
	}
}