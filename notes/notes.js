let notes = []
// notes
const notesValue = document.getElementById('add-value').addEventListener('click', function () {
    const myNotesValue = document.getElementById('inputField').value;
    addNote(myNotesValue); // Call addNote function with the note value
});

function addNote(noteValue) {
    if (noteValue === '') {
        return
    }

    const parent = document.getElementById('note-container');

    // Create a new div element for the note
    const div = document.createElement('div');
     div.classList.add('card-body','mt-16');
      // Add class for styling if needed 
    div.innerHTML = `
     
        <div class="card-actions justify-end">
            <p>${noteValue}</p>
            <button class='btn-delete'><i class="fa fa-trash mr-8"></i></button>
        </div>
        
        
    `;

    parent.appendChild(div);

    document.getElementById('inputField').value = '';

    // Save data, update buttons, etc. (Call other necessary functions)
    saveData();
    deleteButton();

}



function deleteButton() {
    const buttons = document.querySelectorAll('.btn-delete');
    for (const button of buttons) {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            const noteItem = e.target.closest('.card-body');
            if (noteItem) {
                noteItem.remove(); // Remove the note from the DOM
                removeData(noteItem); // Remove the note from local storage
            }
        });
    }
}

function removeData(noteItem) {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
        // Remove the note content from local storage
        const updatedNotes = savedNotes.replace(noteItem.outerHTML, '');
        localStorage.setItem('notes', updatedNotes);
    }
}

// Save data to local storage
function saveData() {
    const notes = document.getElementById('note-container').innerHTML;
    localStorage.setItem('notes', notes);
}

// Load data from local storage
function loadData() {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
        document.getElementById('note-container').innerHTML = savedNotes;
        count = document.querySelectorAll('#note-container div ').length;
        deleteButton();
       

    }
}

// Call loadData when the page loads
window.onload = function () {
    loadData();
}





 
// function for the enter key,have to check it later 

 function keyDown() {
  document.getElementById('inputField').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      addNote()
    }
  });
}
keyDown()
