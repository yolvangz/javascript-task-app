export class BsAlert {
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
			try{
				let alert = new bootstrap.Alert(document.querySelector('.alert'));
				alert.close();
			} catch (error) {
				document.querySelector('.alert').remove();
				console.error(error);
			}
		}, 3000);
	}
}