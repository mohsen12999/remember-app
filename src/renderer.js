const save_btn = document.getElementById("save_btn");

save_btn.addEventListener("click", () => {
  // find add checkboxes title
  const allTasks = ["task1", "task2", "task3"];
  // find all checked checkbox and retrieved their title
  const doneTasks = ["task1", "task3"];

  window.electronAPI.saveData([allTasks, doneTasks]);
});

window.electronAPI.loadData((event, data) => {
  console.log("Received data from main:", data); // Handle received data
  const all_tasks = data.tasks;
  const tasks_ul = document.getElementById("task_list");
  all_tasks.forEach((a_task) => {
    const li_element = document.createElement("li");
    li_element.innerHTML = `<label><input type="checkbox" /> ${a_task}</label>`; //a_task
    tasks_ul.append(li_element);
  });

  const today_span = document.getElementById("today");
  today_span.innerText = data.currentDate;
});
