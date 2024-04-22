let notes = []
//add notes
const notesValue = document.getElementById('add-value').addEventListener('click',addNote)

function addNote() {
    const myNotesValue = document.getElementById('inputField').value;
    if (myNotesValue === '') {
        return
    }

    const parent = document.getElementById('note-container');

    
    const div = document.createElement('div');
     div.classList.add('card-body','mt-16');
      // Add class for styling if needed 
    div.innerHTML = `
     
        <div class="card-actions justify-end">
            <p>${myNotesValue}</p>
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
                noteItem.remove();
                removeData(noteItem); 
            }
        });
    }
}

function removeData(noteItem) {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      
        const updatedNotes = savedNotes.replace(noteItem.outerHTML, '');
        localStorage.setItem('notes', updatedNotes);
    }
}

// Save data 
function saveData() {
    const notes = document.getElementById('note-container').innerHTML;
    localStorage.setItem('notes', notes);
}

// Load data 
function loadData() {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
        document.getElementById('note-container').innerHTML = savedNotes;
        count = document.querySelectorAll('#note-container div ').length;
        deleteButton();
       

    }
}

// Call loadData 
window.onload = function () {
    loadData();
}




 function keyDown() {
  document.getElementById('inputField').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      addNote()
    }
  });
}
keyDown()
