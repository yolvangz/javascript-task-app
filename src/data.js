class Data {
	constructor () {
		if(!localStorage.getItem('taskList')) {
			localStorage.setItem('taskList', '[]');
			localStorage.setItem('taskIdAI', 0);
		}

		this.getData();
	}
	addTask (task) {
		let newTask = new Task(task, this.lastId);
		let newID = this.lastId + 1;
		
		let newData = this.data;
		newData.push(newTask);

		this.sendData(newData, newID);
	}
	deleteTask (id) {
		let newData = this.data.filter((task) => {return task.id !== id;});
		this.sendData(newData);
	}
	getData () {
		this.data = JSON.parse(localStorage.getItem('taskList'));
		this.lastId = Number(localStorage.getItem('taskIdAI'));
	}
	sendData(data, id){
		if (data) {
			localStorage.setItem('taskList', JSON.stringify(data));	
		}
		if (id) {
			localStorage.setItem('taskIdAI', id.toString());	
		}
		this.getData();
	}
}
class Task {
	constructor (data, id) {
		this.id = id;
		this.name = data.name;
		this.description = data.description;
		this.createdDate = Date.now();
	}

}