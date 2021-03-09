export class Data {
	constructor () {
		if(!localStorage.getItem('taskList')) {
			localStorage.setItem('taskList', '[]');
			localStorage.setItem('taskIdAI', 0);
		}

		this.getData();
	}
	findTask (id) {
		return this.data.find((i) => {
			return i.id === id
		})
	}
	addTask (task) {
		try {
			let newTask = new Task(task, this.lastId);
			let newID = this.lastId + 1;
			
			let newData = this.data;
			newData.push(newTask);

			this.sendData(newData, newID);
			return true;
		} catch (e) {
			console.error(e);
			return false;
		}
	}
	deleteTask (id) {
		try {
			let newData = this.data.filter((task) => {return task.id !== id;});
			this.sendData(newData);
			return true;
		} catch (e) {
			console.error(e);
			return false;
		}
	}
	updateTask (task) {
		try {
			if (typeof task.id === 'number' && !isNaN(task.id)) {
				const updatedTask = new Task(task, task.id);
				let updatedData = this.data;
				const taskIndex = updatedData.findIndex((i) => {return i.id === task.id});
				
				if (taskIndex > -1) {
					updatedData[taskIndex] = updatedTask;
					this.sendData(updatedData);
					return true;
				} else {
					throw `Sorry, id does not match to any existent task`;
				}
			} else {
				throw `ERROR: id is '${typeof id}'`;
			}
		} catch (e) {
			console.error(e);
			return false;
		}
	}
	getData () {
		this.data = JSON.parse(localStorage.getItem('taskList'));
		this.lastId = Number(localStorage.getItem('taskIdAI'));
	}
	sendData(data, lastID){
		if (data) {
			localStorage.setItem('taskList', JSON.stringify(data));	
		}
		if (lastID) {
			localStorage.setItem('taskIdAI', lastID.toString());	
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