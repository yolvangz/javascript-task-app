class Form {
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
}
class List {
	print (container) {
		container.innerHTML = `
			<div class="card">
				<div class="card-body table-responsive">
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
		`;
		const taskList = container.getElementById('taskList');
		if (window.dataTask.data.length > 0) {
			window.dataTask.data.forEach((task) => {
				this.printTask(taskList, task);
			});
		} else {
			this.printTask(taskList);
		}
	}
	printTask (container, task = null) {
		const element = document.createElement('tr');
		element.className = 'task-row';
		if (task === null) {
			element.innerHTML = `
				<td colspan="4" class="text-center">¡Felicidades! No tienes tareas.</td>
			`;
		} else {
			element.innerHTML = `
				<td>${task.name}</td>
				<td class="text-break">${task.description}</td>
				<td style="white-space: nowrap">${this.formatDate(task.createdDate)}</td>
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
		container.appendChild(element);
	}
	formatDate (timestamp) {
		const date = new Date(timestamp);
		return `${date.getFullYear()}-${(date.getMonth())+1}-${date.getDate()}`;
	}
}
class BsAlert {
	print (container, text, type) {
		const element = document.createElement('div');

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
			if (alert !== undefined) {
				alert.close();
			} else {
				document.querySelector('.alert').remove;
			}
		}, 3000);
	}
}

// Body COmponent
class Body {
	constructor (type, idTask) {
		this.idTask = idTask;
		if (typeof idTask === 'number' && isNaN(idTask)) {
			this.form = new Form(type, idTask);
		} else {
			this.form = new Form(type);
		}
		this.list = new List();
		this.message = new BsAlert()
	}
	print (container) {
		container.innerHTML = '';
		const element = document.createElement('div');
		element.className = 'row';
		switch (this.type) {
			case 'create':
				element.innerHTML= `
					<div class="col-12">
						<!-- Here will Go the messages -->
						<div id="messageBox"></div>
					</div>
					<aside class="col col-md-4 form-container">
					</aside>
					<section class="col list-container">
					</section>
				`;
				container.appendChild(element);
				this.list.print();
			break;
			case 'update':
				element.innerHTML= `
					<div class="col-12">
						<!-- Here will Go the messages -->
						<div id="messageBox"></div>
					</div>
					<div class="col-md-5 mx-auto form-container">
					</div>
				`;
				container.appendChild(element);
			break;
		}


		this.form.print(document.querySelector('.form-container'));

		if (window.message) {
			this.message(window.message.message, window.message.type);
		}
		ui.addDOMEvents(action);
	}
}