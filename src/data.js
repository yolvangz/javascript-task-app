class Data {
	constructor () {
		if(!localStorage.getItem('taskList')) {
			localStorage.setItem('taskList', '[]');
		}
		this.data = JSON.parse(localStorage.getItem('taskList'));
	}
	addTask (task) {
		let newTask = new Task(task, this.data.length);
		this.data.push(newTask);
		localStorage.setItem('taskList', JSON.stringify(this.data));
	}
}
class Task {
	constructor (data, index) {
		this.index = index;
		this.name = data.name;
		this.description = data.description;
		this.createdDate = Date.now();
	}

}