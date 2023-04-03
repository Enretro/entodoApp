createField = document.getElementById('create-field')

function itemTemplate(item) {
    return `
    <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
        <span class="item-text">${item.text}</span>
        <div>
            <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
            <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
        </div>
    </li>`
}

// Initial Page Load Render
enHTML = items.map(function(item) {
    return itemTemplate(item)
}).join("")
document.getElementById("item-list").insertAdjacentHTML('beforeend', enHTML)

// Create Feature
document.getElementById('create-form').addEventListener('submit', function(event) {
    event.preventDefault()
    axios.post('/create-item', {text: createField.value}).then(function(response) {
        // Create HTML for a new item
        document.getElementById('item-list').insertAdjacentHTML('beforeend', itemTemplate(response.data))
        createField.value("")
        createField.focus()
    }).catch(function() {
        console.log("try later...")
        res.send("succes")
    })
})

document.addEventListener('click', function(e) {
    // Delete Feature
    if (e.target.classList.contains("delete-me")) {
        if (confirm("Want to delete this item?")) {
            axios.post('/delete-item', {id: e.target.getAttribute('data-id') }).then(function() {
                e.target.parentElement.parentElement.remove()
            }).catch(function() {
                console.log("try later...")
                res.send("succes")
            })
        }
    }
    
    // Update Feature
    if (e.target.classList.contains("edit-me")) {
        userInput = prompt("Enter desired new text", e.target.parentElement.parentElement.querySelector('.item-text').innerHTML)
        if (userInput) {
            axios.post('/update-item', {text: userInput, id: e.target.getAttribute('data-id') }).then(function() {
                e.target.parentElement.parentElement.querySelector('.item-text').innerHTML = userInput
            }).catch(function() {
                console.log("try later...")
                res.send("succes")
            })
        }
    }
})