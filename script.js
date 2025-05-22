const checkBoxList = document.querySelectorAll(".circle-1");
const allInputList = document.querySelectorAll(".input-1");
const error = document.querySelector(".paragraph");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");

// Get saved goals or empty object if none
const allGoal = JSON.parse(localStorage.getItem("allGoal")) || {};

// ✅ Function to update progress bar dynamically
function updateProgress() {
  const total = allInputList.length;
  const completed = [...allInputList].filter(
    (input) => allGoal[input.id]?.completed
  ).length;
  const percent = total ? (completed / total) * 100 : 0;
  progressValue.style.width = `${percent}%`;
}

// ✅ On checkbox click
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

// ✅ On input typing
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
    updateProgress(); // Optional but helps reset progress if needed
  });
});

// ✅ Initial call to update progress on load
updateProgress();
function updateProgress() {
  const total = allInputList.length;
  const completed = [...allInputList].filter(
    (input) => allGoal[input.id]?.completed
  ).length;
  const percent = total ? (completed / total) * 100 : 0;
  progressValue.style.width = `${percent}%`;

  // 🆕 Update progress text
  const progressText = document.getElementById("progress-text");
  if (progressText) {
    progressText.textContent = `${completed}/${total} Completed`;
  }
}
