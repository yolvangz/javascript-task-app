import {Form} from './modules/Form.js';
import {List} from './modules/List.js';
import {BsAlert} from './modules/Alert.js';
import {Body} from './modules/Body.js';

export class UI {
	constructor (idTask) {
		this.form = (typeof idTask === 'number' && !isNaN(idTask)) ? new Form('update', idTask) : new Form('create');
		this.body = (typeof idTask === 'number' && !isNaN(idTask)) ? new Body('update', idTask) : new Body('create');
		this.list = new List();
		this.message = new BsAlert();
	}
	print (options = {}) {
		if (options.element !== undefined && options.container !== undefined) {
			switch (options.element) {
				case 'message':
					this.message.print(options.container, options.text, options.type);
				break;
				case 'list':
					this[options.element].print(options.container, options.data);
				break;
				case 'form':
					this[options.element].print(options.container, options.data);
				break;
				default:
					this[options.element].print(options.container);
			}
		} else {
			throw 'Sorry, options are uncompleted';
		}
	}
}