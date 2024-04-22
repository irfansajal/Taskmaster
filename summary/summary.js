let summary = []
// summary
const summaryValue = document.getElementById('add-value').addEventListener('click', function () {
    const mySummaryValue = document.getElementById('inputField').value;
    addSummary(mySummaryValue); // Call addNote function with the note value
});

function addSummary(summaryValue) {
    if (summaryValue === '') {
        return
    }

    const parent = document.getElementById('Summary-container');

    // Create a new div element for the note
    const div = document.createElement('div');
     /* div.classList.add('card-body', 'mt-16'); */
    // Add class for styling if needed 
    div.innerHTML = `
     <div class="card-body">
        <figure><img class="w-2/4 h-4/5 hidden sm:block" src="https://source.unsplash.com/random/?city,night" alt="photo" /></figure>
    
        <h2 class="card-title">How was your day!</h2>
        <p>${summaryValue}</p>
        
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
            const noteItem = e.target.closest('div');
            if (noteItem) {
                noteItem.remove(); // Remove the note from the DOM
                removeData(noteItem); // Remove the note from local storage
            }
        });
    }
}

function removeData(noteItem) {
    const savedSummary = localStorage.getItem('summary');
    if (savedSummary) {
        // Remove the note content from local storage
        const updatedSummary = savedSummary.replace(noteItem.outerHTML, '');
        localStorage.setItem('summary', updatedSummary);
    }
}

// Save data to local storage
function saveData() {
    const summary = document.getElementById('Summary-container').innerHTML;
    localStorage.setItem('summary', summary);
}

// Load data from local storage
function loadData() {
    const savedSummary = localStorage.getItem('summary');
    if (savedSummary) {
        document.getElementById('Summary-container').innerHTML = savedSummary;
        count = document.querySelectorAll('#Summary-container div ').length;
        deleteButton();


    }
}

// Call loadData when the page loads
window.onload = function () {
    loadData();
}






// function for the enter key

function keyDown() {
    document.getElementById('inputField').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            addSummary()
        }
    });
}
keyDown()
