// app.js

// Load tasks from localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const priorityInput = document.getElementById('priorityInput');
    const dateInput = document.getElementById('dateInput');
    const taskText = taskInput.value.trim();
    const priority = priorityInput.value;
    const date = dateInput.value;

    if (taskText === '' || date === '') {
        alert('Please enter a task and select a date.');
        return;
    }

    const taskList = document.getElementById('taskList');
    
    // Create a new list item
    const li = document.createElement('li');
    li.textContent = `${taskText} (Priority: ${priority}, Date: ${date})`;
    li.className = priority; // Set class based on priority
    
    // Create remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove';
    removeButton.onclick = function() {
        li.remove();
        saveTasks();
    };
    
    // Append button to list item
    li.appendChild(removeButton);
    
    // Append list item to the task list
    taskList.appendChild(li);

    // Clear the input fields
    taskInput.value = '';
    priorityInput.value = 'low';
    dateInput.value = '';

    // Save tasks to localStorage
    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = [];
    for (const li of taskList.children) {
        const text = li.textContent.replace('Remove', '').trim();
        const taskText = text.split(' (Priority: ')[0].trim();
        const priorityText = text.split('Priority: ')[1].split(', Date: ')[0].trim();
        const dateText = text.split('Date: ')[1].trim();
        tasks.push({
            text: taskText,
            priority: priorityText,
            date: dateText
        });
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');

    for (const task of tasks) {
        const li = document.createElement('li');
        li.textContent = `${task.text} (Priority: ${task.priority}, Date: ${task.date})`;
        li.className = task.priority; // Set class based on priority

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove';
        removeButton.onclick = function() {
            li.remove();
            saveTasks();
        };

        // Append button to list item
        li.appendChild(removeButton);

        // Append list item to the task list
        taskList.appendChild(li);
    }
}
