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
                    <button class="modify-task">✎</button>
                    <button class="delete-task">🗑</button>
                </td>
            `;
            taskList.appendChild(taskItem);
        });
    }

    // Ejemplo de datos de tarea (puedes reemplazarlos con tus propios datos)
    const tasks = [
        { name: "Tarea 1", status: "En Curso", dueDate: "2024-03-15", estimatedTime: "2 horas" },
        { name: "Tarea 2", status: "Completado", dueDate: "2024-03-20", estimatedTime: "3 horas" }
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

        const newTask = {
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
});
