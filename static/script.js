const refreshNoteList = (notes) => {
    const noteListElm = document.querySelector('.note-list')
    noteListElm.innerHTML=''
    for (let note of notes){
        let card = document.createElement('div')
        card.classList.add('card')

        let title = document.createElement('span')
        title.classList.add('card-title')
        title.innerText = note.name
        card.appendChild(title)

        let body = document.createElement('span')
        body.classList.add('card-body')
        body.innerText = note.text
        card.appendChild(body)

        const bottomBlock = document.createElement('div')
        bottomBlock.classList.add('bottom-block')

        const changeDate = document.createElement('div')
        changeDate.classList.add('date')

        const dateLabel = document.createElement('span')
        dateLabel.innerHTML = 'Дата изменения заметки:'
        changeDate.appendChild(dateLabel)
        const dateValue = document.createElement('span')
        dateValue.innerHTML = new Date(note.date).toISOString()
        changeDate.appendChild(dateValue)
        bottomBlock.appendChild(changeDate)

        const buttons = document.createElement('div')
        buttons.classList.add('buttons')

        let buttonChange = document.createElement('button')
        buttonChange.classList.add('change')
        buttonChange.innerText = 'Редактировать'
        buttonChange.addEventListener('click', () => {
            const index = notes.findIndex((value)=> value == note)
            
        })
        buttons.appendChild(buttonChange)

        let buttonDel = document.createElement('button')
        buttonDel.classList.add('del')
        buttonDel.innerText = 'Удалить заметку'
        buttonDel.addEventListener('click', () => {
            const index = notes.findIndex((value)=> value == note)
            if(index<0){
                return
            }
            notes.splice(index, 1)
            refreshNoteList()
        })
        buttons.appendChild(buttonDel)

        bottomBlock.appendChild(buttons)
        card.appendChild(bottomBlock)

        noteListElm.appendChild(card)
    }
}

fetch('/api/notes', { method: 'get' })
    .then((data) => data.json())
    .then((data) => refreshNoteList(data))
