const socket= io();

//Carga los datos
export const loadNotes = (callback) =>{
    socket.on('server:loadnotes', callback)
};

//Guarda los datos
export const saveNote = (title, description) => {
    socket.emit('client:newnote', {
        title,
        description
    });
};

//Cuando el servidor envia una nueva nota
export const onNewNote = (callback) => {
    socket.on('server:newnote', callback)
};

//Eliminar datos:
export const deleteNote = id => {
    socket.emit('client:deletenote', id);
}

//Enviar los datos al backend
export const getNoteById = (id) => {
    socket.emit('client:getnote', id)
}

//Seleccionar los datos
export const onSelected = (callback) => {
    socket.on('server:selectednote', callback)
}

//Actualizar los datos
export const updateNote = (id, title, description) => {
    socket.emit('client:updatenote', {
        _id: id,
        title,
        description,
    });
}