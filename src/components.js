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
		const row = new Row();
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
		const taskList = document.getElementById('taskList');
		if (window.dataTask.data.length > 0) {
			window.dataTask.data.forEach((task, index) => {
				row.print(taskList, task, index);
			});
		} else {
			row.print(taskList);
		}
	}
}
class Row {
	print (container, task = null, index) {
		const actions = {
			update: new ActionButton('update'),
			delete: new ActionButton('delete'),
		}
		const element = document.createElement('tr');
		element.className = 'task-row';
		if (task === null) {
			element.innerHTML = `
				<td colspan="4" class="text-center">¡Felicidades! No tienes tareas.</td>
			`;
			container.appendChild(element);
		} else {
			element.innerHTML = `
				<td>${task.name}</td>
				<td class="text-break">${task.description}</td>
				<td style="white-space: nowrap">${this.formatDate(task.createdDate)}</td>
				<td class="actions-${index}">
				</td>
			`;
			container.appendChild(element);
			const actionsContainer = querySelector(`.actions-${index}`);
			for (button in actions) {
				actions[button].print(actionsContainer, task.id);
			}
		}
	}
	formatDate (timestamp) {
		const date = new Date(timestamp);
		return `${date.getFullYear()}-${(date.getMonth())+1}-${date.getDate()}`;
	}
}
class ActionButton {
	constructor (type) {
		this.type = type;
	}
	print (container, id) {
		const element = document.createElement('button');
		element.dataset.idtask = id;
		switch (this.type) {
			case 'update':
				element.className = 'btn btn-secondary mb-1 taskAction';
				element.name='update';
				element.title='Editar';
				element.innerHTML = '<i class="bi bi-pencil-fill"></i>';
			break;
			case 'delete':
				element.className = 'btn btn-danger mb-1 taskAction';
				element.name='delete';
				element.title='Eliminar';
				element.innerHTML = '<i class="bi bi-trash"></i>';
			break;
		}
		container.appendChild(element);
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
		this.type = type
		if (typeof idTask === 'number') {
			this.idTask = idTask;
		}
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

		if (window.message) {
			this.message(window.message.message, window.message.type);
		}
	}
}

class UI {
	constructor (idTask) {
		this.form = (typeof idTask === 'number' && isNaN(idTask)) ? new Form('update', idTask) : new Form('create');
		this.body = (typeof idTask === 'number' && isNaN(idTask)) ? new Body('update', idTask) : new Body('create');
		this.list = new List();
		this.message = new BsAlert();
	}
	print(options = {}) {
		if (options.element !== undefined && options.container !== undefined) {
			switch (options.element) {
				case 'message':
					this.message.print(options.container, options.text, options.type);
				break;
				default:
					this[options.element].print(options.container);
			}
		} else {
			throw 'Sorry, options are uncompleted';
		}
	}
}