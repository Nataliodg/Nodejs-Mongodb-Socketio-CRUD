import Note from './models/Note';

export default(io) => {
    
    io.on('connection', (socket) => {
        //Consulta a la db
        const emitNotes = async () => {
            const notes = await Note.find();
            //Emitir un evento:
            io.emit('server:loadnotes', notes)
        }
        emitNotes();

        //Pasamos los datos a la base de datos
        socket.on('client:newnote', async (data) => {
            const newNote = new Note(data);
            const saveNote = await newNote.save();
            //Permite que se actualice en tiempo real con io
            io.emit('server:newnote', saveNote)
        });

        //Elimina los datos de la base de datos
        socket.on('client:deletenote', async (id) => {
            await Note.findByIdAndDelete(id)
        emitNotes();
        });

        //Recibe los datos del cliente
        socket.on('client:getnote', async id =>{
            const note = await Note.findById(id)
            socket.emit('server:selectednote', note);
        })

        socket.on('client:updatenote', async (updatedNote) => {
            await Note.findByIdAndUpdate(updatedNote._id, {
                title: updatedNote.title,
                description: updatedNote.description,
            })
            emitNotes();
        })
    });
};