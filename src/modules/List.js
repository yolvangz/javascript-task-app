export class List {
	print (container, data) {
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
		const taskList = this.getDOM();
		if (data.data.length > 0) {
			data.data.forEach((task, index) => {
				row.print(taskList, task, index);
			});
		} else {
			row.print(taskList);
		}
	}
	getDOM () {
		return document.getElementById('taskList');
	}
	eventListener (app) {
		this.getDOM().addEventListener('click', (event) => {
			let buttonTag = event.target;
			while (buttonTag.name === undefined && buttonTag.id !== 'taskList') {
				buttonTag = buttonTag.parentElement;
			}
			if (buttonTag.id === 'taskList') {
				return;
			}
			try {
				let idTask = Number(buttonTag.dataset.idtask);
				switch (buttonTag.name) {
					case 'update':
						app.printUpdateUI(idTask);
					break;
					case 'delete':
						app.printDeleteUI(idTask);
					break;
					default:
						throw 'ERROR: Unknown button action';
				}
			} catch (error) {
				console.error(error);
				app.ui.print({
					element: 'message',
					container: document.getElementById('messageBox'),
					type: 'danger',
					text: error,
				});
			}
		});
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
			const actionsContainer = document.querySelector(`.actions-${index}`);
			for (const button in actions) {
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
				element.className = 'btn btn-secondary mb-1 mr-1 taskAction';
				element.name='update';
				element.title='Editar';
				element.innerHTML = '<i class="bi bi-pencil-fill"></i>';
			break;
			case 'delete':
				element.className = 'btn btn-danger mb-1 mr-1 taskAction';
				element.name='delete';
				element.title='Eliminar';
				element.innerHTML = '<i class="bi bi-trash"></i>';
			break;
		}
		container.appendChild(element);
	}
}