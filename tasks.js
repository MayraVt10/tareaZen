document.addEventListener("DOMContentLoaded", function() {
    // Función para listar las tareas
    function renderTasks(tasks) {
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = ""; // Limpiar la lista antes de volver a renderizar

        tasks.forEach(task => {
            const taskItem = document.createElement("tr");
            taskItem.innerHTML = `
                <td>${task.name}</td>
                <td>${task.status}</td>
                <td>${task.dueDate}</td>
                <td>${task.estimatedTime}</td>
                <td>
                    <button class="modify-task" data-id="${task.id}">✎</button>
                    <button class="delete-task" data-id="${task.id}">🗑</button>
                </td>
            `;
            taskList.appendChild(taskItem);
        });
    }

    // Ejemplo de datos de tarea (puedes reemplazarlos con tus propios datos)
    let tasks = [
        { id: 1, name: "Tarea 1", status: "En Curso", dueDate: "2024-03-15", estimatedTime: "2 horas" },
        { id: 2, name: "Tarea 2", status: "Completado", dueDate: "2024-03-20", estimatedTime: "3 horas" }
    ];

    // Renderizar las tareas al cargar la página
    renderTasks(tasks);

    // Agregar tarea
    const addTaskButton = document.getElementById("addTaskButton");
    const modal = document.getElementById("modal");
    const closeButton = document.querySelector(".close");
    const addTaskFormModal = document.getElementById("addTaskFormModal");

    addTaskButton.addEventListener("click", function() {
        modal.style.display = "block";
    });

    closeButton.addEventListener("click", function() {
        modal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    addTaskFormModal.addEventListener("submit", function(event) {
        event.preventDefault();

        const taskName = document.getElementById("taskNameModal").value;
        const taskStatus = document.getElementById("taskStatusModal").value;
        const dueDate = document.getElementById("dueDateModal").value;
        const estimatedTime = document.getElementById("estimatedTimeModal").value;
        const taskId = tasks.length + 1;

        const newTask = {
            id: taskId,
            name: taskName,
            status: taskStatus,
            dueDate: dueDate,
            estimatedTime: estimatedTime
        };

        tasks.push(newTask);
        renderTasks(tasks);

        modal.style.display = "none";
        addTaskFormModal.reset();
    });

    // Modificar tarea
    const taskList = document.getElementById("taskList");
    taskList.addEventListener("click", function(event) {
        if (event.target.classList.contains("modify-task")) {
            const taskId = parseInt(event.target.getAttribute("data-id"));
            const taskToModify = tasks.find(task => task.id === taskId);
            const newName = prompt("Ingrese el nuevo nombre de la tarea", taskToModify.name);
            if (newName !== null) {
                taskToModify.name = newName;
                renderTasks(tasks);
            }
        }
    });

    // Eliminar tarea
    taskList.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-task")) {
            const taskId = parseInt(event.target.getAttribute("data-id"));
            tasks = tasks.filter(task => task.id !== taskId);
            renderTasks(tasks);
        }
    });
});
