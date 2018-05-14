let apiURL = 'https://secure-eyrie-78012.herokuapp.com/roles';
let POSTapiURL = 'https://secure-eyrie-78012.herokuapp.com/users';
var selectedOption;
let emptyP = document.querySelector('p');

fetch(apiURL)
  .then(response => response.json())
  .then(makeDropDowns);

function makeDropDowns(response) {
  response.map(function (item) {
    let roleToAdd = item.label;
    let $option = document.createElement('option');
    $option.value = roleToAdd;
    let optionText = document.createTextNode(roleToAdd);
    $option.appendChild(optionText);
    let dropdownMenu = document.querySelector('select');
    dropdownMenu.appendChild($option);
  });
}

function setPicture(sel) {
  var img = document.querySelector('img');
  selectedOption = sel.options[sel.selectedIndex].text;
  img.src = `/assets/${selectedOption}.jpg`;
}

document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault();
  const MessageData = new FormData(event.target);
  const objectToSend = {
    'firstName': MessageData.get('firstName'),
    'lastName': MessageData.get('lastName'),
    'role': findRole()
  };
  sendMessage(objectToSend);
});

function sendMessage(submissionObject) {
  fetch(POSTapiURL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(submissionObject),
    })
    .then(response => response.json())
    .then(response => {
      emptyP.innerHTML = response.message;
      setTimeout(slowRemove, 4000)
    })
    .catch(console.error);
}

function slowRemove() {
  emptyP.style.display = 'none';
}

function findRole() {
  var role;
  if (selectedOption == 'Assassin') {
    role = 1;
  } else if (selectedOption == 'Commando') {
    role = 2;
  } else if (selectedOption == 'Siren') {
    role = 3;
  }
  return role;
}