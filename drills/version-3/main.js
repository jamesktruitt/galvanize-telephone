const rolesURL = fetch("https://secure-eyrie-78012.herokuapp.com/roles");
const URL = "https://secure-eyrie-78012.herokuapp.com";
const roleList = document.getElementById("drop_down");
const figure = document.querySelector("img");

rolesURL
  .then(data => data.json())
  .then(data => {
    for (const role of data) {
      const options = document.createElement("option");
      options.innerText = `${ role.label }`;
      roles.appendChild(options);
    }
    roles.addEventListener("change", event => {
      const change = event.target.selectedIndex;
      data.filter(pic => {
        if (pic.id === change) {
          figure.src = `${ URL }/images/${ pic.imageURL }`;
        } else if (change === 0) {
          figure.src = "assets/placeholder.jpg";
        }
      });
    });
  })
  .catch(err => {
    console.error(err);
  });

const form = document.querySelector("form");
form.addEventListener("submit", sendMsg);

function sendMsg(event) {
  event.preventDefault();
  const userURL = "https://secure-eyrie-78012.herokuapp.com/users";
  const data = new FormData(event.target);

function roles() {
  if (data.get("roles") === "Assassin") {
    return 1;
  } else if (data.get("roles") === "Commando") {
    return 2;
  } else {
    return 3;
  }
}

  const formMsg = {
    firstName: data.get("first_name"),
    lastName: data.get("last_name"),
    role: roles(),
  };

  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formMsg),
  };

  fetch(userURL, postOptions)
    .then(res => res.json())
    .then(res => {
      console.log(res.message);
      const p = document.querySelector("p");
      p.textContent = res.message;
      setTimeout(() => {
        p.textContent = "";
      }, 4000);
    })
    .catch(err => {
      console.error(err);
    });
}