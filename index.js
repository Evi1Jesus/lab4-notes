const express = require ('express') // подключаем библиотеку express
const bodyParser = require ('body-parser') // подключаем библиотеку для обработки тела запроса

const app = express() // создали http сервер

app.use(express.static('./static')) // делаем статические файлы видимыми
app.use (bodyParser.json()) // превращаем body у запросов в json

const notes = [
    { name: 'Заметка 1', text: 'dfaesgrtdh', date: new Date() },
    { name: 'Заметка 2', text: 'daesrh', date: new Date() },
    { name: 'Заметка 3', text: 'fasgrhdtyj', date: new Date()},
    { name: 'Заметка 4', text: 'grhetyu', date: new Date() },
]

const toDos = [
        { name: 'Дело 1', text: 'do1', done: false},
        { name: 'Дело 2', text: 'do2', done: false},
        { name: 'Дело 3', text: 'do3', done: false},
        { name: 'Дело 4', text: 'do4', done: true},
]

app.get('/api/note', (request, response)=>{
    response.status(200)
    response.header('Content-Type', 'application/json')
    response.send(JSON.stringify(notes))
}) // написали обработчик get метода

app.post('/api/note', (request, response)=>{
    const newNote = request.body
    newNote.date = new Date()
    notes.push(newNote)
    response.sendStatus(200)
}) // написали обработчик post метода

app.put('/api/note', (request, response) => {
    const {noteId, ...newNote} = request.body // разбиваем объект request.body на noteId и на остальную часть, которая будет положена в  newNote
    notes[noteId] = { ...notes[noteId], ...newNote } // создаем новый объект из объекта массива note с номером noteId и объектом newNote(name, text)
    response.sendStatus(200)
})//написали обработчик put метода

app.delete('/api/note', (request, response) => {
    const noteIndex = request.body.noteId // кладем в noteIndex значение поля noteId из тела запроса
    notes.splice(noteIndex, 1)
    response.sendStatus(200)
}) //написали обработчик delete метода

app.get('/api/todo', (request, response)=>{
    response.status(200)
    response.header('Content-Type', 'application/json')
    response.send(JSON.stringify(toDos))
}) // написали обработчик get метода

app.post('/api/todo', (request, response)=>{
    const newToDo = request.body
    toDos.push(newToDo)
    response.sendStatus(200)
}) // написали обработчик post метода

app.put('/api/todo', (request, response) =>{
    const {toDoId, ...newToDo} = request.body
    toDos[toDoId] = { ...toDos[toDoId], ...newToDo }
    response.sendStatus(200)
})//написали обработчик put метода

app.delete('/api/todo', (request, response) =>{
    const toDoIndex = request.body.toDoId
    toDos.splice(toDoIndex, 1)
    response.sendStatus(200)
}) //написали обработчик delete метода

app.listen(80, (error) => {
    if (!!error) {
        console.log('Ошибка запуска сервера')
    }
}) // запускаем http сервер на 80 порту
