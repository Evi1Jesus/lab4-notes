const express = require ('express') // подключаем библиотеку express

const app = express() // создали http сервер

app.use(express.static('./static'))

const notes = [
    { name: 'Заметка 1', text: 'dfaesgrtdh', date: new Date() },
    { name: 'Заметка 2', text: 'daesrh', date: new Date() },
    { name: 'Заметка 3', text: 'fasgrhdtyj', date: new Date()},
    { name: 'Заметка 4', text: 'grhetyu', date: new Date() },
]

app.get('/api/notes', (request, response)=>{
    response.status(200)
    response.header('Content-Type', 'application/json')
    response.send(JSON.stringify(notes))
}) // написали обработчик get метода

app.post('/api/notes', (request, response)=>{
    request.body
    response.status(200)
    response.header('Content-Type', 'application/json')
}) // написали обработчик post метода

app.listen(80, (error)=>{
    if (!!error) {
        console.log('Ошибка запуска сервера')
    }
}) // запускаем http сервер на 80 порту

