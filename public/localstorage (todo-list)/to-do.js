

// constant values cannot be change

const taskInput=document.getElementById('taskInput');
const addTaskBtn=document.getElementById('addTaskBtn');
const taskList=document.getElementById('taskList');
const message=document.getElementById('message');



addTaskBtn.addEventListener('click',()=>{
    const taskInput=document.getElementById('taskInput');
    const taskText=taskInput.value.trim();

function isvalid(taskText){

return taskText.length >=8 && taskText.length <=20; 
}

if  (!isvalid(taskText))
{

    message.textContent="task must be at least 8 into 20 characters";
    message.className = "text-green-500 text-sm font-semibold italic text-center mt-2";
  return;
  
}

else{  
    
    message.textContent = "Task added successfully!";
    message.className = "text-green-500 text-sm font-semibold italic text-center mt-2";

    
  }


    if(taskText !==""){

          const taskList=document.getElementById('taskList');


          const li=document.createElement('li');
          li.classList.add('text-white', 'flex', 'justify-between', 'items-center', 'tomato', 'p-3', 'rounded');
          li.style.color = "white";

   
    li.innerHTML = `
    <div class="tw-flex tw-justify-between tw-items-center tw-bg-gray-700 tw-border tw-border-gray-600 tw-rounded-lg tw-p-3 tw-transition tw-duration-300 hover:tw-shadow-lg hover:tw-bg-gray-600">
      <label class="tw-flex tw-items-center tw-gap-3 tw-flex-grow">
        <input type="checkbox" class="task-checkbox tw-accent-yellowAccent" />
        <span class="task-text tw-text-white">${taskText}</span>
      </label>
  
      <div class="tw-flex tw-gap-2">
        <a href="#" class="tw-text-yellow-400 tw-px-2 tw-rounded hover:tw-underline edit-task">Edit</a>
        <a href="#" class="tw-text-yellow-400 tw-px-2 tw-rounded hover:tw-underline delete-task">Delete</a>
      </div>
    </div>
  `;
  
        taskList.appendChild(li);

        taskInput.value="";
    }
setTimeout(() => {
    addTaskBtn.classList();
}, 5000);


});

document.getElementById('taskList').addEventListener('click', (e) => {
    // Delete task
    if (e.target && e.target.classList.contains('delete-task')) {
        e.preventDefault();
        e.target.closest('li').remove();
    }

    // Edit task
    if (e.target && e.target.classList.contains('edit-task')) {
        e.preventDefault();
        const taskItem = e.target.closest('li');
        const taskSpan = taskItem.querySelector('.task-text'); // corrected selector
        const newTaskText = prompt('Edit your task:', taskSpan.textContent.trim());

        if (newTaskText && newTaskText.trim().length > 0) {
            taskSpan.textContent = newTaskText.trim();  
        }
    }
});
document.getElementById('taskList').addEventListener('change', (e) => {
    if (e.target && e.target.classList.contains('task-checkbox')) {
        const taskText = e.target.closest('label').querySelector('.task-text');
        if (e.target.checked) {
            taskText.style.textDecoration = 'line-through';
            taskText.style.opacity = '0.6';
        } else {
            taskText.style.textDecoration = 'none';
            taskText.style.opacity = '1';
        }
    }
});





