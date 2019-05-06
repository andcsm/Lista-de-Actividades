// Global variables

const addButton = document.querySelector('#add');
const cancelButton = document.querySelector('#cancel');
const input = document.querySelector('.form-control');
const tasks = document.querySelector('.card-body');
const doneBadge = document.querySelector('.badge-success');
const notDoneBadge = document.querySelector('.badge-danger');
let taskList = [];

// Functions

const createTask = (taskName) => {// Create the task and push it into the list
	let task = {
		taskName: taskName,
		state: false
	}

	taskList.push(task);
}

const saveTaskList = () => {// Save the tasks list into the local storage
	localStorage.setItem('taskList', JSON.stringify(taskList));
	printSavedList();
}

const printSavedList = () => {// Print all the tasks saved in the local storage
	tasks.innerHTML = '';
	taskList = JSON.parse(localStorage.getItem('taskList'));

	if (taskList === null) {
		taskList = [];
	} else {
		let done = 0, notDone = 0;
		taskList.forEach((element, index) => {
			let alertClass;
			if (element.state === false) {
				notDone ++;
				alertClass = 'danger';
			}else {
				done ++;
				alertClass = 'success';
			}
			tasks.innerHTML += `<div class="alert alert-${alertClass}" role="alert">
            <b>${element.taskName}</b> - <span>${element.state}</span>
            <span class="float-right">
              <i class="fas fa-check  mx-3" onClick= "doneTask(${index})"></i>
              <i class="fas fa-trash  mx-3" onClick= "deleteTask(${index})"></i>
            </span>
          </div>`;
		});

		doneBadge.innerText = done;// Number of done tasks
		notDoneBadge.innerText = notDone;// Number of not done tasks
	}
}

const deleteTask = (index) => {// Delete a task from the list, the local storage and the front end
	taskList.splice(index, 1);
	tasks.removeChild(tasks.childNodes[index]);
	saveTaskList();
}

const doneTask = (index) => {// Mark a task as done
	taskList[index].state = true;
	saveTaskList();
	tasks.children[index].className = 'alert alert-success';
}

// Eventlisteners

addButton.addEventListener('click', (event) => {// Execute when the add button is clicked
	event.preventDefault();
	if (input.value === '') {
		return false;
	}
	createTask(input.value);
	input.value = '';
	saveTaskList();
});

cancelButton.addEventListener('click', (event) => {// Execute when the cancel button is clicked
	event.preventDefault();
	input.value = '';
});

document.addEventListener('DOMContentLoaded', printSavedList);// Execute when the document is fully loaded
