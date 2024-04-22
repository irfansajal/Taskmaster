let summary = []
//add summary
 
const summaryValue = document.getElementById('add-value').addEventListener('click',addSummary)

function addSummary() {
    const mySummaryValue = document.getElementById('inputField').value;
    if (mySummaryValue === '') {
        return
    }

    const parent = document.getElementById('Summary-container');

   
    const div = document.createElement('div');
   div.classList.add('summary-body')
    div.innerHTML = `
     <div class="card-body">
        <figure><img class="w-2/4 h-4/5 hidden sm:block" src="https://source.unsplash.com/random/?city,night" alt="photo" /></figure>
    
        <h2 class="card-title">My day at a glance!</h2>
        <p>${mySummaryValue}</p>
        
          <button class='btn-delete'><i class="fa fa-trash mr-8"></i></button>
        </div>
     
        
    `;

    parent.appendChild(div); 

    document.getElementById('inputField').value = '';

   
    saveData();
    deleteButton();

}



function deleteButton() {
    const buttons = document.querySelectorAll('.btn-delete');
    for (const button of buttons) {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            const SummaryItem = e.target.closest('.summary-body');
            if (SummaryItem) {
                SummaryItem.remove(); 
                removeData(SummaryItem); 
            }
        });
    }
}

function removeData(SummaryItem) {
    const savedSummary = localStorage.getItem('summary');
    if (savedSummary) {
       
        const updatedSummary = savedSummary.replace(SummaryItem.outerHTML, '');
        localStorage.setItem('summary', updatedSummary);
    }
}

// Save data to local storage
function saveData() {
    const summary = document.getElementById('Summary-container').innerHTML;
    localStorage.setItem('summary', summary);
}


function loadData() {
    const savedSummary = localStorage.getItem('summary');
    if (savedSummary) {
        document.getElementById('Summary-container').innerHTML = savedSummary;
        count = document.querySelectorAll('#Summary-container').length;
        deleteButton();


    }
}

// loadData when the page loads
window.onload = function () {
    loadData();
}




function keyDown() {
    document.getElementById('inputField').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            addSummary()
        }
    });
}
keyDown()
