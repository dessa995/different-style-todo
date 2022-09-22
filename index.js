"use strict";
let groceryList = [];
const groceryName = document.querySelector(".grocery-area");
const addButton = document.querySelector(".add-button");
const paragraph = document.querySelector("p");

let count = 2;

//funkcije

function saveToStorage() {
  localStorage.setItem("todo-items", JSON.stringify(groceryList));
}

function loadFromStorage() {
  const foundObject = localStorage.getItem("todo-items");

  if (foundObject && foundObject.length) {
    groceryList = JSON.parse(foundObject);
  } else groceryList = [];

  console.log(groceryList);

  displayAllGroceriesInHtml(groceryList);
}

function displayAllGroceriesInHtml(groceryList) {
  if (groceryList != []) {
    const parentDiv = document.querySelector(".grocery-list-div");

    const divItem = document.createElement("div");
    divItem.className = "div-item";

    const pText = document.createElement("p");
    pText.textContent = groceryName.value;
    pText.className = "text-todo";

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "delete";

    deleteButton.addEventListener("click", () => {
      divItem.remove();
      dleteById(groceryList.id);
    });
    divItem.append(pText, deleteButton);
    parentDiv.append(divItem);
  } else return;
}

function addGrocery(addingGroceries) {
  groceryList.push(addingGroceries);
  addingGroceries.id = count++;

  console.log(addingGroceries);

  displayAllGroceriesInHtml(groceryList);

  saveToStorage();
}

function addNewGrocery() {
  const newGrocery = {
    name: groceryName.value,
    id: 1,
  };

  addGrocery(newGrocery);

  groceryName.value = "";
}

//events

addButton.addEventListener("click", function () {
  addNewGrocery();
});

groceryName.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    addNewGrocery();
  }
});

loadFromStorage();

// Hvatamo dugme

function removeFromStorage() {
  localStorage.removeItem("todo-items", JSON.stringify(groceryList));
}

const dleteById = (id) => {
  let index = groceryList.findIndex((item) => item.id == id);
  groceryList.pop(index, 1);
  removeFromStorage();
};
