import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js';
import { getFirestore, collection, addDoc, doc, getDocs, updateDoc, deleteDoc, query, where } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js';

// Configura Firebase Firestore
const firebaseConfig = {
    apiKey: "AIzaSyBVag40nxYkgDjYUl7hKDrbuKQ6M3Qc-cQ",
    authDomain: "todovanillajs.firebaseapp.com",
    projectId: "todovanillajs",
    storageBucket: "todovanillajs.appspot.com",
    messagingSenderId: "133881397842",
    appId: "1:133881397842:web:493d07f548d149eedb158b",
    measurementId: "G-1YY4Z8L0X9"
};

// Inicializando firebase
const app = initializeApp(firebaseConfig);

// Inicializando cloud firestore
const db = getFirestore(app);

console.log('Conexion a Firebase establecida correctamente.');

// Arreglo de tareas
let tasks = [];
var nombreCondicion;

// Función para renderizar las tareas en la tabla
async function renderTasks() {
  tasks = []; // Limpiar el arreglo de tareas
  const querySnapshot = await getDocs(collection(db, "tasks"));
  querySnapshot.forEach((doc) => {
    // Agrega el documento a tu array
    tasks.push(doc.data());
  });
  console.log(tasks);

  const tableBody = document.querySelector("#task-table tbody");
  tableBody.innerHTML = ""; // Limpiar contenido anterior
  
  tasks.forEach((task, index) => {
    const row = tableBody.insertRow(); // Insertar fila en la tabla
    
    // Insertar celdas con los datos de la tarea
    row.insertCell().textContent = task.name;
    row.insertCell().textContent = task.status;
    row.insertCell().textContent = new Date((task.dueDate)).toLocaleDateString("es-ES", { dateStyle: "medium" });
    row.insertCell().textContent = task.estimatedTime;
    row.insertCell().textContent = task.category;
    row.insertCell().textContent = task.priority;
    
    // Insertar celda con botones de acciones
    const actionsCell = row.insertCell();
    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.addEventListener("click", () => {
      openEditTaskForm(task);
      nombreCondicion = document.getElementById("task-edit-name").value;
      console.log(nombreCondicion);
    });
    actionsCell.appendChild(editButton);
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", () => deleteTask(task.name));
    actionsCell.appendChild(deleteButton);
  });
}

// Función para agregar una nueva tarea
async function addTask(event) {
  event.preventDefault(); // Evitar el envío del formulario
  
  try{
    await addDoc(collection(db, 'tasks'), {
      name: document.getElementById("task-name").value,
      status: document.getElementById("task-status").value,
      dueDate: document.getElementById("task-due-date").value,
      estimatedTime: document.getElementById("task-estimated-time").value,
      category: document.getElementById("task-category").value,
      priority: document.getElementById("task-priority").value
    });
    
    // Cerrar el formulario
    closeTaskForm();

    // Renderizar la tabla de tareas
    console.log('Se registro la tarea con exito.');
    location.reload();
  } catch (error){
    console.error('Error al registrar tarea.', error);
  }  
}

// Función para editar una tarea
async function editTask(event) {
  event.preventDefault(); // Evitar el envío del formulario
  try {
    // Obtener los datos del formulario
    const nombre = document.getElementById("task-edit-name").value;
    const estado = document.getElementById("task-edit-status").value;
    const fechaLimite = document.getElementById("task-edit-due-date").value;
    const tiempoEstimado = document.getElementById("task-edit-estimated-time").value;
    const categoria = document.getElementById("task-edit-category").value;
    const prioridad = document.getElementById("task-edit-priority").value;
    const taskId = document.getElementById("task-edit-id").value;

    const querySnapshot = await getDocs(collection(db, "tasks"), where("name", "==", nombreCondicion));
    if(!querySnapshot.empty){
      const docRef = querySnapshot.docs[0].ref;

      await updateDoc(docRef, {
        name: nombre,
        status: estado,
        dueDate: fechaLimite,
        estimatedTime: tiempoEstimado,
        category: categoria,
        priority: prioridad
      });

    console.log('Tarea actualizada con éxito.');
    closeEditTaskForm();
    renderTasks();
    //location.reload();

  } else {
    console.error('No se encontro la tarea a editar.');
  }
    console.log('Tarea actualizada con éxito.');
  } catch (error) {
    console.error('Error al actualizar tarea:', error);
  }
}

async function deleteTask(nombre) {
  try {
    const confirmDelete = confirm('¿Estás seguro de que quieres eliminar esta tarea?');

    if(confirmDelete){
      const querySnapshot = await getDocs(collection(db, "tasks"), where("name", "==", nombre));
      if(!querySnapshot.empty){
        const docRef = querySnapshot.docs[0].ref;
        await deleteDoc(docRef);
        console.log('Tarea eliminada con éxito.');
        renderTasks();
      } else {
        console.error('No se encontro la tarea a eliminar.');
      }
    } else {
      console.log('No se elimino la tarea.');
    }
  } catch (error) {
    console.error('Error al eliminar tarea:', error);
  }
}

// Función para filtrar las tareas según los criterios seleccionados
function filterTasks() {
  const statusFilter = document.getElementById("status-filter").value;
  const dueDateFilter = document.getElementById("due-date-filter").value;
  const categoryFilter = document.getElementById("category-filter").value;
  const priorityFilter = document.getElementById("priority-filter").value;

  const filteredTasks = tasks.filter(task => {
    // Filtrar por estado
    if (statusFilter && task.status !== statusFilter) {
      return false;
    }

    // Filtrar por fecha de vencimiento
    if (dueDateFilter && task.dueDate !== dueDateFilter) {
      return false;
    }

    // Filtrar por categoría
    if (categoryFilter && task.category !== categoryFilter) {
      return false;
    }

    // Filtrar por prioridad
    if (priorityFilter && task.priority !== priorityFilter) {
      return false;
    }

    return true;
  });

  renderFilteredTasks(filteredTasks);
}

// Función para renderizar las tareas filtradas en la tabla
function renderFilteredTasks(filteredTasks) {
  const tableBody = document.querySelector("#task-table tbody");
  tableBody.innerHTML = ""; // Limpiar contenido anterior
  
  filteredTasks.forEach((task, index) => {
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
    editButton.addEventListener("click", () => editTask(tasks.indexOf(task)));
    actionsCell.appendChild(editButton);
    
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", () => deleteTask(tasks.indexOf(task)));
    actionsCell.appendChild(deleteButton);
  });
}

// Inicialización: Renderizar las tareas existentes
renderTasks();

// Event listener para el envío del formulario
document.getElementById("task-form").addEventListener("submit", addTask);
document.getElementById("task-edit-form").addEventListener("submit", editTask);

// Event listener para los cambios en los filtros
document.getElementById("status-filter").addEventListener("change", filterTasks);
document.getElementById("due-date-filter").addEventListener("change", filterTasks);
document.getElementById("category-filter").addEventListener("change", filterTasks);
document.getElementById("priority-filter").addEventListener("change", filterTasks);
