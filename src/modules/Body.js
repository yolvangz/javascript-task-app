export class Body {
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
	}
}