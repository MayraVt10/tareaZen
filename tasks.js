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
                <td>${task.category}</td>
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
        { id: 1, name: "Tarea 1", status: "En Curso", dueDate: "2024-03-15", estimatedTime: "2 horas", category: "Trabajo" },
        { id: 2, name: "Tarea 2", status: "Completado", dueDate: "2024-03-20", estimatedTime: "3 horas", category: "Casa" }
    ];

    // Renderizar las tareas al cargar la página
    renderTasks(tasks);

    // Obtener y renderizar las categorías disponibles
    const categorySelect = document.getElementById("categoryModal");
    const categories = tasks.reduce((acc, curr) => {
        if (!acc.includes(curr.category)) {
            acc.push(curr.category);
        }
        return acc;
    }, []);

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });

    // Agregar tarea
    const addTaskButton = document.getElementById("addTaskButton");
    const modal = document.getElementById("modal");
    const closeButton = document.querySelector(".close");
    const addTaskFormModal = document.getElementById("addTaskFormModal");

    addTaskButton.addEventListener("click", function() {
        modal.style.display = "block";
        document.getElementById("submitButton").innerText = "Agregar";
        document.getElementById("addTaskFormModal").reset();
        document.getElementById("addTaskFormModal").dataset.mode = "add"; // Modo de agregar tarea
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
        const category = document.getElementById("categoryModal").value;
        const mode = addTaskFormModal.dataset.mode; // Obtener el modo (agregar o modificar)

        if (mode === "add") { // Modo de agregar tarea
            const taskId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;

            const newTask = {
                id: taskId,
                name: taskName,
                status: taskStatus,
                dueDate: dueDate,
                estimatedTime: estimatedTime,
                category: category
            };

            tasks.push(newTask);
        } else if (mode === "edit") { // Modo de modificar tarea
            const taskId = parseInt(addTaskFormModal.dataset.taskId); // Obtener el ID de la tarea a modificar

            const taskIndex = tasks.findIndex(task => task.id === taskId);
            tasks[taskIndex] = {
                ...tasks[taskIndex], // Mantener los valores anteriores de la tarea
                name: taskName,
                status: taskStatus,
                dueDate: dueDate,
                estimatedTime: estimatedTime,
                category: category
            };
        }

        renderTasks(tasks);
        modal.style.display = "none";
    });

    // Modificar tarea
    const taskList = document.getElementById("taskList");
    taskList.addEventListener("click", function(event) {
        if (event.target.classList.contains("modify-task")) {
            const taskId = parseInt(event.target.getAttribute("data-id"));
            const taskToModify = tasks.find(task => task.id === taskId);

            // Llenar el formulario con los detalles de la tarea seleccionada
            document.getElementById("taskNameModal").value = taskToModify.name;
            document.getElementById("taskStatusModal").value = taskToModify.status;
            document.getElementById("dueDateModal").value = taskToModify.dueDate;
            document.getElementById("estimatedTimeModal").value = taskToModify.estimatedTime;
            document.getElementById("categoryModal").value = taskToModify.category;

            modal.style.display = "block";
            document.getElementById("submitButton").innerText = "Modificar";
            document.getElementById("addTaskFormModal").dataset.mode = "edit"; // Modo de modificar tarea
            document.getElementById("addTaskFormModal").dataset.taskId = taskId; // ID de la tarea a modificar
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
