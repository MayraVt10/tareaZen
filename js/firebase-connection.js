import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js';
import { getFirestore, collection, addDoc, doc, getDocs, query, where } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js';

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

// Obtencion de referencias a los formularios y mensajes de error
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

// Maneja el evento de inicio de sesión
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const username = loginForm['loginUsername'].value;
    const password = loginForm['loginPassword'].value;
  
    try {
        const q = query(collection(db, "users"), where("username", "==", username));
        
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            if(doc.data().username == username && doc.data().password == password){
                location.replace("./index.html")
            } else{
                console.log('Usuario o contraseña incorrecto(s).');
            }
        });
    }
    catch (error) {
      console.error("Error al buscar usuario en Firestore:", error);
      loginError.textContent = "Error al buscar usuario";
    }
  });