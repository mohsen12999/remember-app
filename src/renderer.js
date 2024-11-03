window.electronAPI.loadData((event, data) => {
  console.log("Received data from main:", data); // Handle received data

  const all_tasks = data.tasks;
  const tasks_ul = document.getElementById("task_list");

  all_tasks.forEach((a_task) => {
    const li_element = make_new_li(a_task);
    tasks_ul.append(li_element);
  });
  
  const today_span = document.getElementById("today");
  today_span.innerText = data.currentDate;
});

function make_new_li(task_name) {
  const li_element = document.createElement("li");
  li_element.innerHTML = `<label><input type="checkbox" />${task_name}</label><span class="remove_task" onclick="remove_task(this)">x</span>`;
  return li_element;
}

const save_btn = document.getElementById("save_btn");

save_btn.addEventListener("click", () => {
  // find add checkboxes title
  const allTasksLabel = document.querySelectorAll("ul#task_list>li>label");
  const allTasks = Array.from(allTasksLabel, (e) => e.innerText);

  // find all checked checkbox and retrieved their title
  const allCheckedTasksLabel = document.querySelectorAll(
    "ul#task_list>li>label:has(>input[type='checkbox']:checked)"
  );
  const doneTasks = Array.from(allCheckedTasksLabel, (e) => e.innerText);

  window.electronAPI.saveData([allTasks, doneTasks]);
});

function remove_task(remove_task_span) {
  // console.log({remove_task_span});
  
  if(confirm("Are you sure to delete task?")){
    remove_task_span.parentElement.remove();
  }
}

const add_task_btn = document.getElementById("add_task_btn");

add_task_btn.addEventListener("click", add_new_task_function);

const new_task_ele =  document.getElementById("new_task_input");

new_task_ele.addEventListener('keyup', function (e) {
  if (e.key === 'Enter') {
    add_new_task_function();
  }
});

function add_new_task_function() {
  const new_task = new_task_ele.value.trim();

  if(new_task != ""){
    const tasks_ul = document.getElementById("task_list");
    const li_element = make_new_li(new_task);
    tasks_ul.append(li_element);

    new_task_ele.value = "";
  }
}