function myClock() {
  setTimeout(function () {
    const d = new Date();
    const n = d.toLocaleTimeString();
    document.getElementById("clock").innerHTML = n;
    myClock();
  }, 1000)
}
myClock();

let count = 0;
let task = []
console.log(task);

const inputValue = document.getElementById('add-value').addEventListener('click', function () {
  count += 1
  const myInputValue = document.getElementById('inputField').value
  if (myInputValue === '') {
    return alert('Please provide a valid task')
  }
  const parent = document.getElementById('content-container')
  const tr = document.createElement('tr')
  tr.innerHTML = `
  <th>${count}</th>
  <th>${myInputValue}</th>
  <th>
   <button class='btn-delete' ><i class="fa fa-trash mr-8 "></i></button>
  
   <button class = 'btn-done'><i class="fas fa-check "></i></button>
  </th>
  `;
  parent.appendChild(tr)
  document.getElementById('inputField').value = ''
  saveData()

  
  deleteButton()
  doneFunction()
  
})



function deleteButton() {
  const buttons = document.querySelectorAll('.btn-delete')
  for (const elements of buttons) {
    //console.log('click');
    elements.addEventListener('click', function (e) {
      e.stopPropagation();
      const removeItem = e.target.closest('tr')
      if (removeItem) {
        removeItem.style.display = 'none'

        // done differently
        const taskContentToRemove = removeItem.innerHTML;
        removeData(taskContentToRemove)
        loadData()
      }

    })
   
  }
 
}

function deleteAll() {
  const ClearAll = document.getElementById('clear all').addEventListener('click', function (e) {
    console.log('click');
    console.log(e.target.parentNode.parentNode);
    const removeItem = e.target.parentNode.parentNode
    if (removeItem) {
      removeItem.style.display = 'none'
      localStorage.clear()
      location.reload()
    }

  })

}
deleteAll()


function doneFunction() {
  const selectDone = document.querySelectorAll('.btn-done')
  for (const elements of selectDone) {
    elements.addEventListener('click', function (e) {
      const removeItem = e.target.closest('tr')
      if (removeItem) {
        removeItem.style.display = 'none'
        // done differently
        const taskContentToRemove = removeItem.innerHTML;
        removeData(taskContentToRemove)
        loadData()
        let pumpkin = confetti.shapeFromPath({
          path: 'M449.4 142c-5 0-10 .3-15 1a183 183 0 0 0-66.9-19.1V87.5a17.5 17.5 0 1 0-35 0v36.4a183 183 0 0 0-67 19c-4.9-.6-9.9-1-14.8-1C170.3 142 105 219.6 105 315s65.3 173 145.7 173c5 0 10-.3 14.8-1a184.7 184.7 0 0 0 169 0c4.9.7 9.9 1 14.9 1 80.3 0 145.6-77.6 145.6-173s-65.3-173-145.7-173zm-220 138 27.4-40.4a11.6 11.6 0 0 1 16.4-2.7l54.7 40.3a11.3 11.3 0 0 1-7 20.3H239a11.3 11.3 0 0 1-9.6-17.5zM444 383.8l-43.7 17.5a17.7 17.7 0 0 1-13 0l-37.3-15-37.2 15a17.8 17.8 0 0 1-13 0L256 383.8a17.5 17.5 0 0 1 13-32.6l37.3 15 37.2-15c4.2-1.6 8.8-1.6 13 0l37.3 15 37.2-15a17.5 17.5 0 0 1 13 32.6zm17-86.3h-82a11.3 11.3 0 0 1-6.9-20.4l54.7-40.3a11.6 11.6 0 0 1 16.4 2.8l27.4 40.4a11.3 11.3 0 0 1-9.6 17.5z',
          matrix: [0.020491803278688523, 0, 0, 0.020491803278688523, -7.172131147540983, -5.9016393442622945]
        });

        let tree = confetti.shapeFromPath({
          path: 'M120 240c-41,14 -91,18 -120,1 29,-10 57,-22 81,-40 -18,2 -37,3 -55,-3 25,-14 48,-30 66,-51 -11,5 -26,8 -45,7 20,-14 40,-30 57,-49 -13,1 -26,2 -38,-1 18,-11 35,-25 51,-43 -13,3 -24,5 -35,6 21,-19 40,-41 53,-67 14,26 32,48 54,67 -11,-1 -23,-3 -35,-6 15,18 32,32 51,43 -13,3 -26,2 -38,1 17,19 36,35 56,49 -19,1 -33,-2 -45,-7 19,21 42,37 67,51 -19,6 -37,5 -56,3 25,18 53,30 82,40 -30,17 -79,13 -120,-1l0 41 -31 0 0 -41z',
          matrix: [0.03597122302158273, 0, 0, 0.03597122302158273, -4.856115107913669, -5.071942446043165]
        });

        let heart = confetti.shapeFromPath({
          path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z',
          matrix: [0.03333333333333333, 0, 0, 0.03333333333333333, -5.566666666666666, -5.533333333333333]
        });

        let defaults = {
          scalar: 0.8,
          spread: 150,
          particleCount: 150,
          origin: { y: -0.2 },
          startVelocity: -40
        };

        confetti({
          ...defaults,
          shapes: [pumpkin],
          colors: ['#ff9a00', '#ff7400', '#ff4d00']
        });
        confetti({
          ...defaults,
          shapes: [tree],
          colors: ['#8d960f', '#be0f10', '#445404']
        });
        confetti({
          ...defaults,
          shapes: [heart],
          colors: ['#f93963', '#a10864', '#ee0b93']
        });
      }
    })
  }
}
//  gpt code form here 

// Save data to local storage
function saveData() {
  const tasks = document.getElementById('content-container').innerHTML;
  localStorage.setItem('tasks', tasks);
}

// Load data from local storage
function loadData() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    document.getElementById('content-container').innerHTML = savedTasks;
    count = document.querySelectorAll('#content-container tr').length;
    deleteButton();
    doneFunction();
    
  }
}

// Call loadData when the page loads
window.onload = function () {
  loadData();
}



  function removeData(taskContentToRemove) {
  // Retrieve the stored HTML string from local storage
  const storedTasks = localStorage.getItem('tasks');

  if (storedTasks) {
    // Remove the task content from the stored HTML string
    const modifiedTasks = storedTasks.replace(taskContentToRemove, '');

    // Update local storage with modified data
    localStorage.setItem('tasks', modifiedTasks);

    // Update the displayed tasks
    document.getElementById('content-container').innerHTML = modifiedTasks;
  }
}  




// burger menu
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.style.display = navLinks.style.display === 'block' ? 'none' : 'block';
}
