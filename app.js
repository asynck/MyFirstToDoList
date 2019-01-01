var items = []; 
items.push(new ToDoItem("laura"));
items.push(new ToDoItem("kelly"));
items.push(new ToDoItem("pocket"));
render();

//this is an event handler - for elements that exist when the page loads!
document.getElementById("input").onkeyup = function(e) {
    if (e.keyCode == 13) {
        addToDoItem();
    }
}

document.getElementById("list").onclick = function(e) {
    let childIndex = getChildIndex(e.target);
    console.log(e.target, childIndex)
    e.target.parentElement.removeChild(e.target);
    items.splice(childIndex,1);
    console.log()
    
}

document.getElementById("clearBut").onclick = function(e) {
    document.getElementById("list").innerHTML = "";
    items = [];
}

document.getElementById("sortBut").onclick = sort;

function ToDoItem(title) {
    this.title = title;
    let d = new Date();
    this.date = "" + d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
    this.backgroundColor = "#FFFFFF";
}

function addToDoItem() {
    let title = document.getElementById("input").value;
    let todoItem = new ToDoItem(title);

    // add the item to our collection/array
    items.push(todoItem);
    console.dir(items);

    // sort();

    render();

    document.getElementById("input").value = "";
}

// sort the array by title aplhabetically
function sort() {
    items.sort(function(todoItem1, todoItem2) {
        if (todoItem1.title < todoItem2.title) {
            return -1;
        }
        if (todoItem1.title > todoItem2.title) {
            return 1;
        }
        // a must be equal to b
        return 0;
    })

    render();
}

function render() {
    // re-render the list
    document.getElementById("list").innerHTML = "";

    for (let i = 0; i < items.length; i++) {
        let ul = document.getElementById("list");
        let li = document.createElement("li");
        let div = document.createElement("div");
        let divDate = document.createElement("div");
        div.innerText = '- ' + items[i].title;
        divDate.innerText = items[i].date;
        divDate.classList.add("date");
        ul.appendChild(li);
        li.appendChild(div);
        li.appendChild(divDate);
    }
}

var getChildIndex = function(child) {
    var parent = child.parentElement;
    var children = parent.children;
    var i = children.length - 1;
    for (; i >= 0; i--){
        if (child == children[i]){
            break;
        }
    }
    return i;
}


