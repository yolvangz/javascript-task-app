class HTML {
	constructor() {
		this.create = `
			<aside class="col col-md-4">
				<!-- Here will Go the messages -->
				<div id="messageBox"></div>
				<div class="card" id="taskFormCard">
					<div class="card-body">
						<h2 class="h4 mb-4">Crea una nueva tarea:</h2>
						<form action="#" class="form" id="taskForm">
							<div class="form-group mb-3">
								<input type="text" name="taskName" required class="form-control" placeholder="Nombre de la tarea">
							</div>
								<textarea name="taskDescription" required class="form-control" rows="5" placeholder="¿De qué trata?"></textarea>
							<div class="form-group mb-3"></div>
							<button class="form-control btn btn-lg btn-success btn-block" name="save_task">Guardar tarea</button>
						</form>
					</div>
				</div>
			</aside>
			<section class="col">
				<div class="card">
					<div class="card-body">
						<table class="table table-striped">
							<thead>
								<th>Title</th>
								<th>Decription</th>
								<th>Created At</th>
								<th>Actions</th>
							</thead>
							<tbody id="taskList">
							</tbody>
						</table>
					</div>
				</div>
			</section>
		`;
		this.update = `
			<div class="col-5 mx-auto">
			<div id="messageBox"></div>
				<div class="card">
					<div class="card-body">
						<h2 class="text-center fw-normal">Editar Tarea</h2>
						<form action="#" class="form" id="taskForm">
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
	addTask (task = null) {
		const taskList = document.getElementById('taskList');
		const element = document.createElement('tr');
		if (task === null) {
			element.innerHTML = `
				<td colspan="4" class="text-center">Ups! Al parecer hubo un error.</td>
			`;
		} else {
			element.innerHTML = `
				<td>${task.name}</td>
				<td>${task.description}</td>
				<td>${task.date}</td>
				<td>
					<button class="btn btn-secondary" name="update" title="Editar">
						<i class="bi bi-pencil-fill"></i>
					</button>
					<button class="btn btn-danger" name="delete" title="Eliminar">
						<i class="bi bi-trash"></i>
					</button>
				</td>
			`;
		}
		taskList.appendChild(element);
	}
	/*deleteTask (event) {
		if (event.target.name === 'delete') {
			let targetTag = event.target;
			// Code to go up a level into de DOM until get the searched parent
			while (targetTag.className !== '') {
				targetTag = targetTag.parentElement;
			}
			targetTag.remove();
		}
	}*/
	generateBody (action, targetTag) {
		targetTag.innerHTML = '';

		const element = document.createElement('div');
		element.className = 'row';
		element.innerHTML = this[action];
		targetTag.appendChild(element);
		this.addDOMEvents();
	}

	showMessage (message, type) {
		const element = document.createElement('div');
		element.className = `alert alert-${type} alert-dismissible fade show`;
		element.role = 'alert';
		element.innerHTML = `
			${message}
			<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
		`;
		// Showing in DOM
		const container = document.querySelector('.container aside.col-4');
		const app = document.querySelector('#taskFormCard');
		container.insertBefore(element, app);

		setTimeout(() => {
			let alert = bootstrap.Alert.getInstace(document.querySelector('.alert'));
			alert.close();
		}, 3000);
	}
	resetForm (event) {
		event.target.reset();
	}
	addDOMEvents () {
		// On Submit new task
		document.getElementById('taskForm')
			.addEventListener('submit', (e) => {
				e.preventDefault();
				const form = e.target;
				const task = {
					name: form.querySelector('#name').value,
					description: form.querySelector('#description').value,
				}

				if (task.name === '' || task.description === '') {
					return this.showMessage('Faltan datos para crear la tarea', 'danger');
				}
				const product = new Product(taskName, productPrice, productYear);

				this.addProduct(product);
				this.showMessage('¡Tarea creada <strong>Exitosamente</strong>!', 'success');
				this.resetForm(e);
			});
		/*document.getElementById('productList')
			.addEventListener('click', (e) => {
				this.deleteProduct(e);
				this.showMessage('¡Tarea eliminada <strong>Exitosamente</strong>!', 'success');
			});*/
	}
}