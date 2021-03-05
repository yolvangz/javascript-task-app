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
			<div class="col-5 mx-auto">
				<div class="card">
					<div class="card-body">
						<h2 class="text-center fw-normal">Editar Tarea</h2>
						<form action="#" class="form" id="taskForm" data-type="update">
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

class UI extends HTML {
	constructor () {
		super();
	}
	// Generating DOM HTML methods
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
	deleteTask (targetTag) {
		// Code to go up a level into de DOM until get the searched parent
		while (targetTag.className !== 'task-row') {
			targetTag = targetTag.parentElement;
		}
		targetTag.remove();
	}
	generateBody (action, targetTag) {
		targetTag.innerHTML = '';

		const element = document.createElement('div');
		element.className = 'row';
		element.innerHTML = this[action];
		targetTag.appendChild(element);
		if (action === 'create') {
			this.generateTaskList();
		}
		this.addDOMEvents();
	}
	generateTaskList () {
		const list = document.getElementById('taskList');
		list.innerHTML = '';
		if (window.dataTask.data.length > 0) {
			window.dataTask.data.forEach((task) => {
				this.addTask(list, task);
			});
		} else {
			this.addTask(list);
		}
	}
	// Utilities methods
	// =================================
	showMessage (message, type) {
		const element = document.createElement('div');
		const container = document.getElementById('messageBox');
		// const app = document.querySelector('#taskFormCard');

		element.className = `alert alert-${type} alert-dismissible fade show`;
		element.role = 'alert';
		element.innerHTML = `
			${message}
			<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
		`;
		// Showing in DOM
		container.appendChild(element);

		setTimeout(() => {
			let alert = new bootstrap.Alert(document.querySelector('.alert'));
			alert.close();
		}, 3000);
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
	addDOMEvents () {
		// On Submit new task
		document.getElementById('taskForm')
			.addEventListener('submit', (event) => {
				event.preventDefault();
				const form = event.target;
				let task = {
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
							break;
						case 'update':
							// window.dataTask.updateTask();
							break;
					}
					this.showMessage('¡Tarea creada <strong>Exitosamente</strong>!', 'success');
					this.resetForm(event);
				} catch(error) {
					console.log(error);
					return this.showMessage(`<strong>¡Ups!</strong>, ${error}`, 'danger');
				}
				this.generateTaskList();
			});
		document.getElementById('taskList')
			.addEventListener('click', (event) => {
				let buttonTag = event.target;
				while (!buttonTag.name && buttonTag.id !== 'taskList') {
					buttonTag = buttonTag.parentElement;
				}
				try {

					if (buttonTag.name === 'delete') {	
						let idTask = Number(buttonTag.dataset.idtask);
						window.dataTask.deleteTask(idTask);
						this.deleteTask(buttonTag);
						this.showMessage('¡Tarea eliminada <strong>Exitosamente</strong>!', 'success');
					}

				} catch (error) {
					console.log(error);
					return this.showMessage(`<strong>¡Ups!</strong>, ${error}`, 'danger');	
				}
			});
	}
}