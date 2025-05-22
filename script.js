const checkBoxList = document.querySelectorAll(".circle-1");
const allInputList = document.querySelectorAll(".input-1");
const error = document.querySelector(".paragraph");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");


const allGoal = JSON.parse(localStorage.getItem("allGoal")) || {};


function updateProgress() {
  const total = allInputList.length;
  const completed = [...allInputList].filter(
    (input) => allGoal[input.id]?.completed
  ).length;
  const percent = total ? (completed / total) * 100 : 0;
  progressValue.style.width = `${percent}%`;
}


checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", () => {
    const allGoalAdded = [...allInputList].every((input) => input.value.trim());

    if (allGoalAdded) {
      checkbox.parentElement.classList.toggle("completed");

      const inputId = checkbox.nextElementSibling.id;

      if (allGoal[inputId]) {
        allGoal[inputId].completed = !allGoal[inputId].completed;
        localStorage.setItem("allGoal", JSON.stringify(allGoal));
        updateProgress();
      }
    } else {
      progressBar.classList.add("show-error");
    }
  });
});


allInputList.forEach((input) => {
  const goalData = allGoal[input.id];
  input.value = goalData?.name || "";

  if (goalData?.completed) {
    input.parentElement.classList.add("completed");
  }

  input.addEventListener("focus", () => {
    progressBar.classList.remove("show-error");
  });

  input.addEventListener("input", () => {
    allGoal[input.id] = {
      name: input.value,
      completed: false,
    };
    localStorage.setItem("allGoal", JSON.stringify(allGoal));
    updateProgress();
  });
});


updateProgress();
function updateProgress() {
  const total = allInputList.length;
  const completed = [...allInputList].filter(
    (input) => allGoal[input.id]?.completed
  ).length;
  const percent = total ? (completed / total) * 100 : 0;
  progressValue.style.width = `${percent}%`;


  const progressText = document.getElementById("progress-text");
  if (progressText) {
    progressText.textContent = `${completed}/${total} Completed`;
  }
}
