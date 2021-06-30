const taskContainer= document.querySelector(".task__container");
console.log(taskContainer);

let globalStore =  [];

const newCard= ({id,imageUrl, taskTitle, taskType , taskDescription}) => `
<div class="col-md-6 col-lg-4" id=${id}>
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" id=${id} class="btn btn-outline-success" onclick= "editCard.apply(this , arguments)"><i class="fas fa-pencil-alt" id=${id} onclick="editCard()"></i></button>
  
    <button type="button" id=${id} class="btn btn-outline-danger" onclick= "deleteCard.apply(this , arguments)"><i class="fas fa-trash" id=${id} onclick= "deleteCard.apply(this , arguments)" id=${id}></i></button>
  </div>
  <img src=${imageUrl} class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${taskTitle}</h5>
    <p class="card-text">${taskDescription}</p>
    <span class="badge bg-primary">${taskType}</span>

  </div>
  <div class="card-footer text-muted ">
    <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
  </div>`;

const loadInitialTaskCards = () =>{
  const getInitialData = localStorage.tasky;
  if (!getInitialData) return;

  const {cards} = JSON.parse(getInitialData); 

  cards.map((cardObject) => {
    const createNewCard = newCard(cardObject);
    taskContainer.insertAdjacentHTML("beforeend", createNewCard);
    globalStore.push(cardObject);
  });
};

const updateLocalStorage= () =>
localStorage.setItem("tasky", JSON.stringify({ cards: globalStore}));


const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}` ,
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value,
    };

    const createNewCard = newCard(taskData);


    taskContainer.insertAdjacentHTML("beforeend", createNewCard);

    globalStore.push(taskData);
    

    //application interface programming (localstorage) 
  updateLocalStorage();


};

const deleteCard= (event) => {

  event= window.event;
  const targetID = event.target.id;
  const tagName = event.target.tagName;
  console.log(targetID)

  globalStore = globalStore.filter((cardObject)=> cardObject.id !== targetID);
  updateLocalStorage();

  if(tagName === "BUTTON"){
    return taskContainer.removeChild(
    event.target.parentNode.parentNode.parentNode);
  }

   return taskContainer.removeChild(
    event.target.parentNode.parentNode.parentNode.parentNode);
};

const editCard= (event) => {
  event= window.event;
  const targetID = event.target.id;
  const tagName = event.target.tagName;

  let parentElement;
  if(tagName === "BUTTON"){
    parentElement = event.target.parentNode.parentNode;
  }else{
    parentElement = event.target.parentNode.parentNode.parentNode;
  }
  let taskTitle = parentElement.childNodes[5].childNodes[1];
  let taskDescription =parentElement.childNodes[5].childNodes[3];
  let taskType =parentElement.childNodes[5].childNodes[5];
  let submitButton=parentElement.childNodes[7].childNodes[1];

  taskTitle.setAttribute("contenteditable", "true");
  taskDescription.setAttribute("contenteditable", "true");
  taskType.setAttribute("contenteditable", "true");
  submitButton.innerHTML= "Save Changes";
};