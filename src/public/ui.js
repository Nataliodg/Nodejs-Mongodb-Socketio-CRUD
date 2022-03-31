import { saveNote, deleteNote, getNoteById, updateNote } from "./socket.js";

//Selecciona los datos de las listas
const notesList = document.querySelector('#notes');
//Guardamos los datos del formulario
const title = document.querySelector('#title');
const description = document.querySelector('#description');

let saveId = "";

const noteUI = note => {
    const div = document.createElement('div')

    //Pinta los datos por pantalla
    div.innerHTML = `
        <div class="bg-dark card card-body rounded-1 border-top-0 border-success mt-2 animate__animated animate__fadeInUp" >
            <div class="d-flex justify-content-between">
                <h2 class="text-success mb-4">${note.title}</h2>
                <div>
                    <button class="btn btn-danger btn-sm delete " data-id="${note._id}">Delete</button>
                    <button class="btn btn-primary btn-sm update" data-id="${note._id}">Update</button>
            </div>
            </div>    
            <p>${note.description}</p>
        </div>
    `

    //Seleccionamos el boton delete y update
    const btnDelete = div.querySelector('.delete');
    const btnUpdate = div.querySelector('.update');

    btnDelete.addEventListener('click', e => deleteNote(btnDelete.dataset.id));
    btnUpdate.addEventListener('click', e => getNoteById(btnUpdate.dataset.id));

    return div
};

//Recorre la lista y se las pasa a noteUI
export const renderNotes = notes => {
    notesList.innerHTML = "";
    notes.forEach(note => notesList.append(noteUI(note))) 
};

//Rellenar el formulario para actualizarlo
export const fillForm = note => {
    title.value = note.title;
    description.value = note.description;
    saveId = note._id;
}

//Escucha el evento
export const onHandleSubmit = (e) => {
    e.preventDefault();
    
    if (saveId) {
        updateNote(saveId, title.value, description.value);
    } else {
        saveNote(title.value, description.value);
    }

    //Seteamos los datos
    saveId = "";
    title.value = "";
    description.value = "";
};

//Agrega la nota al final de la lista
export const appendNote = note => {
    notesList.append(noteUI(note));
};

