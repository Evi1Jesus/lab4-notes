const createElement = (selector, children, options) => {
    const [tag, ...classNames] = selector.split('.')

    const elm = document.createElement(tag)
    elm.classList.add(...classNames)

    if (typeof children === 'string')
        elm.innerText = children
    else if (Array.isArray(children))
        for (const child of children)
            elm.appendChild(child)

    if (typeof options === 'object' && options !== null)
        for (const key of Object.keys(options))
            if (/^on[A-Z]\w+$/.test(key))
                elm.addEventListener(key.slice(2).toLowerCase(), options[key])
            else if (key in elm)
                elm[key] = options[key]

    return elm
}

const refreshNotes = () => {
    fetch('/api/note', { method: 'get' })
        .then((data) => data.json())
        .then((data) => refreshNoteList(data))
}

const refreshNoteList = (notes) => {
    const noteListElm = document.querySelector('.note-list')
    noteListElm.innerHTML=''
    for (let i = 0; i < notes.length; i++) {
        const note = notes[i]
        const card = createElement('div.card', [
            createElement('span.card-title', note.name),
            createElement('span.card-body', note.text),
            createElement('div.bottom-block', [
                createElement('div.date', [
                    createElement('span', 'Дата изменения заметки:'),
                    createElement('span', new Date(note.date).toISOString()),
                ]),
                createElement('div.buttons', [
                    createElement('button.change', 'Редактировать', { onClick: () => {
                        const idElem = document.querySelector('.write-note > [name="id"]') // смотрим айди новой или старой заметки
                        idElem.value = i
                        const noteNameElem = document.querySelector('.write-note > [name="label"]')
                        const noteTextElem = document.querySelector('.write-note > [name="description"]')
                        noteNameElem.value = note.name
                        noteTextElem.value = note.text
                    } }),
                    createElement('button.del', 'Удалить заметку', { onClick: () => {
                        fetch('/api/note', {
                            method: 'delete',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ noteId: i }),
                        }).then(refreshNotes)
                    } }),
                ]),
            ]),
        ])

        noteListElm.appendChild(card)
    }
}

const refreshToDos = () => {
    fetch('/api/todo', { method: 'get' })
        .then((data) => data.json())
        .then((data) => refreshToDoList(data))
}

const refreshToDoList = (toDos) => {
    const toDoListElm = document.querySelector('.todo-list')
    toDoListElm.innerHTML=''
    for (let i = 0; i < toDos.length; i++) {
        const toDo = toDos[i]
        const card = createElement('div.card', [
            createElement('span.card-title', toDo.name),
            createElement('span.card-body', toDo.text),
            createElement('div.bottom-block', [
                createElement('div.date', [
                    createElement('span', 'Выполнена:'),
                    createElement('span', toDo.done ? 'Да' : 'Нет'),
                ]),
                createElement('div.buttons', [
                    createElement('button.change', 'Редактировать', { onClick: () => {
                        const idElem = document.querySelector('.write-todo > [name="id"]') // смотрим айди новой или старой заметки
                        idElem.value = i
                        const toDoNameElem = document.querySelector('.write-todo > [name="label"]')
                        const toDoTextElem = document.querySelector('.write-todo > [name="description"]')
                        toDoNameElem.value = toDo.name
                        toDoTextElem.value = toDo.text
                    } }),
                    createElement('button.del', 'Удалить дело', { onClick: () => {
                        fetch('/api/todo', {
                            method: 'delete',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ noteId: i }),
                        }).then(refreshToDos)
                    } }),
                ]),
            ]),
        ])

        toDoListElm.appendChild(card)
    }
}

const noteFormElem = document.querySelector('.write-note')
const toDoFormElem = document.querySelector('.write-todo')

noteFormElem.addEventListener('submit', (event) =>{
    event.preventDefault()
    const formData = new FormData(noteFormElem)
    const noteId = parseInt(formData.get('id'))
    fetch('/api/note', {
        method: Number.isNaN(noteId) ? 'post' : 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            noteId: Number.isNaN(noteId) ? undefined : noteId,
            name: formData.get('label'),
            text: formData.get('description'),
        })
    }).then(refreshNotes)
})

toDoFormElem.addEventListener('submit', (event) =>{
    event.preventDefault()
    const formData = new FormData(toDoFormElem)
    const toDoId = parseInt(formData.get('id'))
    fetch('/api/todo', {
        method: Number.isNaN(toDoId) ? 'post' : 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            toDoId: Number.isNaN(toDoId) ? undefined : toDoId,
            name: formData.get('label'),
            text: formData.get('description'),
            done: Boolean(formData.get('done')),
        })
    }).then(refreshToDos)
})

refreshNotes()
refreshToDos()
