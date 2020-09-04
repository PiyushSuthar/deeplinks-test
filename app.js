const input = document.getElementById("input");
const nameInput = document.getElementById("inputname");
const submitButton = document.getElementById("submitButton");
const listContainer = document.getElementById("listOfDeeplinks");

submitButton.addEventListener("click", handleSubmit);
input.addEventListener("submit", handleSubmit);
if (localStorage.getItem("deeplinks")) {
  window.onload = renderCards;
}

function handleSubmit() {
  if (nameInput.value !== "" && input.value !== "") {
    const value = {
      name: nameInput.value,
      deeplink: input.value
    };
    handleLocalStorage(value);
    renderCards();
  }
}

function handleLocalStorage(newOBJECT) {
  if (!localStorage.getItem("deeplinks")) {
    const newValue = JSON.stringify([newOBJECT]);
    localStorage.setItem("deeplinks", newValue);
    return;
  }
  const oldValue = JSON.parse(localStorage.getItem("deeplinks"));
  const newValue = [...oldValue, newOBJECT];
  localStorage.setItem("deeplinks", JSON.stringify(newValue));
}

const createLink = (url, name, index) =>
  `<div class="d-inline-flex"><a href="${url}" class="list-group-item list-group-item-action">${name}</a><button data-index="${index}" class="delete-button btn btn-primary mx-1" onclick="handleDelete(this)">Delete</button></div>`;

function renderCards() {
  const deeplinks = JSON.parse(localStorage.getItem("deeplinks"));
  listContainer.innerHTML = "";
  if (deeplinks.length === 0) {
    listContainer.innerHTML = "<p>Add some Deeplinks.</p>";
  }
  deeplinks.forEach((deeplink, index) => {
    listContainer.innerHTML += createLink(
      deeplink.deeplink,
      deeplink.name,
      index
    );
  });
  nameInput.value = "";
  input.value = "";
}

// Deleteing a Deeplink
function handleDelete(el) {
  const index = el.getAttribute("data-index");
  const localStorageData = JSON.parse(localStorage.getItem("deeplinks"));
  localStorageData.splice(index, 1);
  localStorage.setItem("deeplinks", JSON.stringify(localStorageData));
  renderCards();
}
