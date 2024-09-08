document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        taskList.innerHTML = ""; // Clear current list

        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.textContent = task;
            
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.classList.add("edit");
            editButton.addEventListener("click", () => editTask(index));

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("delete");
            deleteButton.addEventListener("click", () => deleteTask(index));

            li.appendChild(editButton);
            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    };

    // Add a new task
    const addTask = () => {
        const task = taskInput.value.trim();
        if (task === "") return;

        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskInput.value = "";
        loadTasks();
    };

    // Edit an existing task
    const editTask = (index) => {
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        const newTask = prompt("Edit the task:", tasks[index]);

        if (newTask === null || newTask.trim() === "") return; // Cancel or empty input

        tasks[index] = newTask.trim();
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    };

    // Delete a task
    const deleteTask = (index) => {
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    };

    addTaskButton.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") addTask();
    });

    // Initial load
    loadTasks();
});
