// Arreglo de tareas (simulado, puedes reemplazarlo con una base de datos)
let tasks = [];

// Función para abrir el formulario de tarea
function openTaskForm() {
  document.getElementById("task-modal").style.display = "block";
}

// Función para cerrar el formulario de tarea
function closeTaskForm() {
  document.getElementById("task-modal").style.display = "none";
}

// Función para agregar una nueva tarea
function addTask(event) {
  event.preventDefault(); // Evitar el envío del formulario
  
  // Obtener valores del formulario
  const name = document.getElementById("task-name").value;
  const status = document.getElementById("task-status").value;
  const dueDate = document.getElementById("task-due-date").value;
  const estimatedTime = document.getElementById("task-estimated-time").value;
  const category = document.getElementById("task-category").value;
  const priority = document.getElementById("task-priority").value;
  
  // Crear objeto tarea
  const task = {
    name: name,
    status: status,
    dueDate: dueDate,
    estimatedTime: estimatedTime,
    category: category,
    priority: priority
  };
  
  // Agregar tarea al arreglo
  tasks.push(task);
  
  // Limpiar el formulario
  document.getElementById("task-form").reset();
  
  // Renderizar la tabla de tareas
  renderTasks();

  // Cerrar el formulario
  closeTaskForm();
}

// Función para renderizar las tareas en la tabla
function renderTasks() {
  const tableBody = document.querySelector("#task-table tbody");
  tableBody.innerHTML = ""; // Limpiar contenido anterior
  
  tasks.forEach((task, index) => {
    const row = tableBody.insertRow(); // Insertar fila en la tabla
    
    // Insertar celdas con los datos de la tarea
    row.insertCell().textContent = task.name;
    row.insertCell().textContent = task.status;
    row.insertCell().textContent = task.dueDate;
    row.insertCell().textContent = task.estimatedTime;
    row.insertCell().textContent = task.category;
    row.insertCell().textContent = task.priority;
    
    // Insertar celda con botones de acciones
    const actionsCell = row.insertCell();
    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.addEventListener("click", () => editTask(index));
    actionsCell.appendChild(editButton);
    
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", () => deleteTask(index));
    actionsCell.appendChild(deleteButton);
  });
}

// Función para editar una tarea
function editTask(index) {
  // Obtener la tarea a editar
  const task = tasks[index];
  
  // Llenar el formulario con los datos de la tarea
  document.getElementById("task-name").value = task.name;
  document.getElementById("task-status").value = task.status;
  document.getElementById("task-due-date").value = task.dueDate;
  document.getElementById("task-estimated-time").value = task.estimatedTime;
  document.getElementById("task-category").value = task.category;
  document.getElementById("task-priority").value = task.priority;
  
  // Mostrar el formulario de edición
  openTaskForm();
  
  // Eliminar la tarea original del arreglo
  tasks.splice(index, 1);
  
  // Renderizar la tabla de tareas actualizada
  renderTasks();
}

// Función para eliminar una tarea
function deleteTask(index) {
  // Eliminar la tarea del arreglo
  tasks.splice(index, 1);
  
  // Renderizar la tabla de tareas actualizada
  renderTasks();
}

// Inicialización: Renderizar las tareas existentes
renderTasks();

// Event listener para el envío del formulario
document.getElementById("task-form").addEventListener("submit", addTask);
