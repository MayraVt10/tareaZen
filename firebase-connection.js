import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js';

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

// Obtén referencias a los formularios y mensajes de error
const registerForm = document.getElementById('registerForm');

// Maneja el evento de registro de usuario
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  try{
    await addDoc(collection(db, 'users'), {
      email: registerForm['registerEmail'].value,
      username: registerForm['registerUsername'].value,
      password: registerForm['registerPassword'].value 
    });
    console.log('Se registro al usuario con exito.');
  } catch (error){
    console.error('Error al registrar usuario.', error);
  }
});