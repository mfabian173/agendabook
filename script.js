/* ==========================================================
   MY LAB DESK
   Phase 1
========================================================== */

const STORAGE_KEY = "my-lab-desk-v1";

const state = {
    tasks: [],
    stickies: [],
    deadlines: [],
    errors: [],
    groups: [],
    quickNotes: ""
};

/* ==========================================================
   ELEMENTS
========================================================== */

const taskList = document.getElementById("taskList");
const stickyContainer = document.getElementById("stickyContainer");
const deadlineList = document.getElementById("deadlineList");
const errorList = document.getElementById("errorList");
const groupList = document.getElementById("groupList");
const quickNotes = document.getElementById("quickNotes");

const clock = document.getElementById("clock");

/* ==========================================================
   CLOCK
========================================================== */

function updateClock(){

    const now = new Date();

    clock.innerText =
        now.toLocaleTimeString([],{
            hour:"2-digit",
            minute:"2-digit"
        });

}

setInterval(updateClock,1000);
updateClock();

/* ==========================================================
   STORAGE
========================================================== */

function save(){

    state.quickNotes = quickNotes.value;

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state)
    );

}

function load(){

    const raw = localStorage.getItem(STORAGE_KEY);

    if(!raw){

        renderAll();
        return;

    }

    const data = JSON.parse(raw);

    state.tasks = data.tasks || [];
    state.stickies = data.stickies || [];
    state.deadlines = data.deadlines || [];
    state.errors = data.errors || [];
    state.groups = data.groups || [];
    state.quickNotes = data.quickNotes || "";

    renderAll();

}

/* ==========================================================
   RENDER EVERYTHING
========================================================== */

function renderAll(){

    renderTasks();
    renderStickies();
    renderDeadlines();
    renderErrors();
    renderGroups();

    quickNotes.value = state.quickNotes;

}

/* ==========================================================
   TASKS
========================================================== */

function renderTasks(){

    taskList.innerHTML = "";

    state.tasks.forEach((task,index)=>{

        const node =
            document
            .getElementById("taskTemplate")
            .content
            .firstElementChild
            .cloneNode(true);

        const check =
            node.querySelector(".taskCheck");

        const text =
            node.querySelector(".taskText");

        const date =
            node.querySelector(".taskDate");

        const del =
            node.querySelector(".deleteButton");

        check.checked = task.done;
        text.value = task.text;
        date.value = task.date;

        check.onchange = ()=>{

            task.done = check.checked;
            save();

        };

        text.oninput = ()=>{

            task.text = text.value;
            save();

        };

        date.onchange = ()=>{

            task.date = date.value;
            save();

        };

        del.onclick = ()=>{

            state.tasks.splice(index,1);

            save();
            renderTasks();

        };

        taskList.appendChild(node);

    });

}

document
.getElementById("addTaskButton")
.onclick = ()=>{

    state.tasks.push({

        done:false,
        text:"",
        date:""

    });

    save();
    renderTasks();

};

/* ==========================================================
   STICKIES
========================================================== */

function renderStickies(){

    stickyContainer.innerHTML = "";

    state.stickies.forEach((note,index)=>{

        const node =
            document
            .getElementById("stickyTemplate")
            .content
            .firstElementChild
            .cloneNode(true);

        const text =
            node.querySelector("textarea");

        const date =
            node.querySelector(".stickyDate");

        const del =
            node.querySelector(".deleteSticky");

        text.value = note.text;
        date.value = note.date;

        text.oninput = ()=>{

            note.text = text.value;
            save();

        };

        date.onchange = ()=>{

            note.date = date.value;
            save();

        };

        del.onclick = ()=>{

            state.stickies.splice(index,1);

            save();

            renderStickies();

        };

        stickyContainer.appendChild(node);

    });

}

document
.getElementById("addStickyButton")
.onclick = ()=>{

    state.stickies.push({

        text:"",
        date:""

    });

    save();

    renderStickies();

};

/* ==========================================================
   AUTO SAVE NOTES
========================================================== */

quickNotes.oninput = save;
/* ==========================================================
   DEADLINES
========================================================== */

function renderDeadlines(){

    deadlineList.innerHTML = "";

    state.deadlines.forEach((item,index)=>{

        const node =
            document
            .getElementById("deadlineTemplate")
            .content
            .firstElementChild
            .cloneNode(true);

        const title =
            node.querySelector('input[type="text"]');

        const date =
            node.querySelector('input[type="date"]');

        const del =
            node.querySelector(".deleteDeadline");

        title.value = item.title;
        date.value = item.date;

        title.oninput = ()=>{

            item.title = title.value;
            save();

        };

        date.onchange = ()=>{

            item.date = date.value;
            save();

        };

        del.onclick = ()=>{

            state.deadlines.splice(index,1);

            save();
            renderDeadlines();

        };

        deadlineList.appendChild(node);

    });

}

document
.getElementById("addDeadlineButton")
.onclick = ()=>{

    state.deadlines.push({

        title:"",
        date:""

    });

    save();
    renderDeadlines();

};

/* ==========================================================
   ERROR CODES
========================================================== */

function renderErrors(){

    errorList.innerHTML = "";

    state.errors.forEach((item,index)=>{

        const node =
            document
            .getElementById("errorTemplate")
            .content
            .firstElementChild
            .cloneNode(true);

        const inputs =
            node.querySelectorAll("input");

        const title = inputs[0];
        const date = inputs[1];

        const notes =
            node.querySelector("textarea");

        const del =
            node.querySelector(".deleteError");

        title.value = item.title;
        notes.value = item.notes;
        date.value = item.date;

        title.oninput = ()=>{

            item.title = title.value;
            save();

        };

        notes.oninput = ()=>{

            item.notes = notes.value;
            save();

        };

        date.onchange = ()=>{

            item.date = date.value;
            save();

        };

        del.onclick = ()=>{

            state.errors.splice(index,1);

            save();
            renderErrors();

        };

        errorList.appendChild(node);

    });

}

document
.getElementById("addErrorButton")
.onclick = ()=>{

    state.errors.push({

        title:"",
        notes:"",
        date:""

    });

    save();
    renderErrors();

};

/* ==========================================================
   PROJECT GROUPS
========================================================== */

function renderGroups(){

    groupList.innerHTML = "";

    state.groups.forEach((group,index)=>{

        const node =
            document
            .getElementById("groupTemplate")
            .content
            .firstElementChild
            .cloneNode(true);

        const inputs =
            node.querySelectorAll("input");

        const name = inputs[0];
        const date = inputs[1];

        const notes =
            node.querySelector("textarea");

        const del =
            node.querySelector(".deleteGroup");

        name.value = group.name;
        notes.value = group.notes;
        date.value = group.date;

        name.oninput = ()=>{

            group.name = name.value;
            save();

        };

        notes.oninput = ()=>{

            group.notes = notes.value;
            save();

        };

        date.onchange = ()=>{

            group.date = date.value;
            save();

        };

        del.onclick = ()=>{

            state.groups.splice(index,1);

            save();
            renderGroups();

        };

        groupList.appendChild(node);

    });

}

document
.getElementById("addGroupButton")
.onclick = ()=>{

    state.groups.push({

        name:"",
        notes:"",
        date:""

    });

    save();
    renderGroups();

};

/* ==========================================================
   INITIALIZE
========================================================== */

load();

/* ==========================================================
   KEYBOARD SHORTCUTS
========================================================== */

document.addEventListener("keydown",(event)=>{

    // Ctrl/Cmd + S forces a save (optional)
    if((event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase()==="s"){

        event.preventDefault();

        save();

    }

});
