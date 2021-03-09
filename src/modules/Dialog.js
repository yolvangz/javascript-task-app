export class Dialog {
	constructor () {

	}
	print (container) {
		const dialogElement = document.createElement('div');
		dialogElement.className = 'modal fade';
		dialogElement.id = 'dialog';
		dialogElement.tabIndex = -1;
		dialogElement.dataset['bs-backdrop'] = 'static';
		dialogElement.innerHTML = `
			<div class="modal-dialog">
			    <div class="modal-content">
		    		<div class="modal-header">
			        	<h5 class="modal-title">Eliminar tarea</h5>
			        	<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			      	</div>
			    	<div class="modal-body">
			        	<p class="h6">¿Estás seguro de que quiere eliminar '${}'?</p>
			        	<p><small>No se podrá recuperar después de esto</small></p></p>
			      	</div>
			    	<div class="modal-footer">
			        	<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
			        	<button type="button" data-type="delete" class="btn btn-danger">Eliminar</button>
			      	</div>
		    	</div>
		  	</div>
		`;

		container.innerHTML = '';
		container.appendChild(dialogElement);
	}
	getDOM () {
		return document.getElementById('dialog');
	}
	eventListener (ui, app, data) {
		this.getDOM().querySelector('button[data-type=delete]')
			.addEventListener('click', () => {
				try {
					if (data.deleteTask(asñldfjasdljf)) {
						ui.print({
							element: 'list',
							container: document.querySelector('.list-container'),
							data: .dataTask,
						});
						ui.list.eventListener(ui, app);
						ui.print({
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
					ui.print({
						element: 'message',
						container: document.getElementById('messageBox'),
						type: 'danger',
						text: error,
					});
				}
			});
	}
}