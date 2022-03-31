import { loadNotes, onNewNote, onSelected } from "./socket.js";
import { onHandleSubmit, renderNotes, appendNote, fillForm } from './ui.js';

//Cuando reciba una nueva nota se la pasa a appendNote para que la cargue por pantalla
onNewNote(appendNote);

//Cuando cargue las notas se las pasa a renderNotes
loadNotes(renderNotes);


onSelected(fillForm);

//Traemos el formulario
const noteForm = document.querySelector('#noteForm')

//Escucha el evento
noteForm.addEventListener('submit', onHandleSubmit);