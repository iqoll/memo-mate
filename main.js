const allNotes = document.getElementById('all_notes');
const createNote = document.querySelector('#create_note');
const title = document.getElementById('title');
const noteInput = document.getElementById('note');
const filter = document.getElementById('filter');

// variable for note style attribute
var random_margin = ['-5px', '1px', '5px', '10px', '7px'];
var random_colors = [
  '#c2ff3d',
  '#ff3de8',
  '#3dc2ff',
  '#04e022',
  '#bc83e6',
  '#ebb328',
];
var random_degree = [
  'rotate(3deg)',
  'rotate(1deg)',
  'rotate(-1deg)',
  'rotate(-3deg)',
  'rotate(-5deg)',
  'rotate(-8deg)',
];
var index = 0;

// Create array to hold data for more notes
let contentArray = localStorage.getItem('items')
  ? JSON.parse(localStorage.getItem('items'))
  : [];

// delete all note event
document.getElementById('delete_notes').addEventListener('click', delNotes);
// show note create event
document
  .getElementById('show_create_note')
  .addEventListener('click', showCreateNote);
// close note create event
document
  .getElementById('close_create_note')
  .addEventListener('click', closeCreateNote);
// add note event
document.getElementById('save_note').addEventListener('click', addNote);
// filter event
filter.addEventListener('keyup', filterItems);

// display note to screen
contentArray.forEach(noteMaker); // also call this function as soon the project start
function noteMaker(text) {
  var note = document.createElement('div');
  var details = document.createElement('div');
  var h2_title = document.createElement('h2');
  var p_note = document.createElement('p');

  // add classes to div
  note.className = 'note';
  details.className = 'details';

  // add css property
  h2_title.setAttribute('style', 'padding: 15px');
  h2_title.innerHTML = text.my_title;

  p_note.setAttribute(
    'style',
    'border-top:1px solid black;display:block; padding:15px'
  );
  p_note.innerHTML = text.my_note;

  // append the h2 to note
  h2_title.appendChild(p_note);
  details.appendChild(h2_title);
  note.appendChild(details);

  // add css property to .note
  if (index > random_colors.length - 1) index = 0;

  note.setAttribute(
    'style',
    `margin:${
      random_margin[Math.floor(Math.random() * random_margin.length)]
    }; background-color:${random_colors[index++]}; transform:${
      random_degree[Math.floor(Math.random() * random_degree.length)]
    }`
  );

  // remove note on dblclick
  note.addEventListener('dblclick', () => {
    note.remove();
  });

  // add .note to #all_notes
  document.querySelector('#all_notes').appendChild(note);
}

// Add user's input note
function addNote() {
  // Store user input in dictionary
  var note_info = {
    my_title: title.value,
    my_note: noteInput.value,
  };

  // store dictionary in contentArray
  contentArray.push(note_info);
  localStorage.setItem('items', JSON.stringify(contentArray));

  // display note on screen
  noteMaker(contentArray[contentArray.length - 1], contentArray.length - 1); //"length -1" last index of array

  // clear input field
  title.value = '';
  noteInput.value = '';
}

// Delete all note
function delNotes() {
  // Clear the local storage and inner HTML
  localStorage.clear();
  allNotes.innerHTML = '';
  contentArray = [];
}

// Show create-note
function showCreateNote() {
  createNote.style.display = 'block';
}

// Close create-note
function closeCreateNote() {
  createNote.style.display = 'none';
}

// Filter items
function filterItems(e) {
  // Convert text to lowercase
  var text = e.target.value.toLowerCase();
  // Get h2
  var noteItem = allNotes.getElementsByClassName('note');
  // Convert to an array
  Array.from(noteItem).forEach(function (title) {
    var titleName = title.firstElementChild.firstElementChild.textContent;
    if (titleName.toLowerCase().indexOf(text) != -1) {
      title.style.display = 'block';
    } else {
      title.style.display = 'none';
    }
  });
}
