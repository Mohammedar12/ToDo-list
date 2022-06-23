let inputTaskName = document.querySelector("#inputTaskName");
let addTaskBtn = document.querySelector("#addTaskBtn");
let tasksDiv = document.querySelector(".tasks");

// taskDiv content

// Empty Array To Store The Tasks

let arrayOfTasks = [];
if (localStorage.task) {
  arrayOfTasks = JSON.parse(localStorage.task);
  addTaskTopage(arrayOfTasks);
}

getDataFromLocal();

// Add Task

addTaskBtn.onclick = function () {
  if (inputTaskName.value !== "") {
    addTaskToArry(inputTaskName.value); //Add Task To Array
    inputTaskName.value = ""; // Empty Input Field
  }
};

function addTaskToArry(taskText) {
  //Task Data

  const task = {
    id: Date.now(),
    title: taskText,
    complate: false,
  };

  // Push Task To Array

  arrayOfTasks.push(task);
  console.log(arrayOfTasks);
  addTaskTopage(arrayOfTasks);

  addDataToLocal(arrayOfTasks);
}

// Delete Task

tasksDiv.addEventListener("click", (e) => {
  if (e.target.id === "delTaskBtn") {
    deleteTaskFromLocal(
      e.target.parentElement.parentElement.getAttribute("data-id")
    );
    e.target.parentElement.parentElement.remove();
  }
  if (e.target.classList.contains("doneBtn")) {
    addToggalDone(e.target.parentElement.parentElement.getAttribute("data-id"));
    e.target.parentElement.parentElement.classList.toggle("done");
  }
});

// add tasks to page

function addTaskTopage(arrayOfTasks) {
  // Empty Task Div
  tasksDiv.innerHTML = "";
  // looping On Array
  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    // check if task is done
    if (task.complate === true) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));

    let btns = document.createElement("div");

    let del = document.createElement("button");
    del.textContent = "Delete";
    del.id = "delTaskBtn";

    let done = document.createElement("button");
    done.textContent = "Done";
    done.id = "doneBtn";
    done.className = "doneBtn";

    div.appendChild(btns);
    btns.appendChild(done);
    btns.appendChild(del);
    tasksDiv.appendChild(div);
    console.log(div);
  });
}

// add data to local

function addDataToLocal(arrayOfTasks) {
  localStorage.task = JSON.stringify(arrayOfTasks);
}

function getDataFromLocal() {
  let data = localStorage.task;
  if (data) {
    let tasks = JSON.parse(data);
    addTaskTopage(tasks);
  }
}

// Delet Task from local

function deleteTaskFromLocal(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocal(arrayOfTasks);
}

function addToggalDone(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].complate == false
        ? (arrayOfTasks[i].complate = true)
        : (arrayOfTasks[i].complate = false);
    }
  }
  addDataToLocal(arrayOfTasks);
}
