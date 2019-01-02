var items = []; 

//some test data
items.push(new ToDoItem("first thing to do is.."));
items.push(new ToDoItem("another thing to do is.."));
items.push(new ToDoItem("oh what a great idea to do.."));
render();

//this is an event handler - for elements that exist when the page loads!
document.getElementById("input").onkeyup = function(e) {
    if (e.keyCode == 13) {
        addToDoItem();
    }
}

function remove(e) {
    let childIndex = getChildIndex(e.target.parentElement);
    e.target.parentElement.remove();
    items.splice(childIndex,1);
}      

document.getElementById("clearBut").onclick = function(e) {
    document.getElementById("list").innerHTML = "";
    items = [];
}

document.getElementById("sortBut").onclick = sort;

function ToDoItem(title) {
    this.title = title;
    let d = new Date();
    this.date = "Edited " + d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
    this.backgroundColor = "#FFFFFF";
}

document.getElementById("colorBut").onchange = function(e) {
    let selectBox = document.getElementById("colorBut");
    let selectedBoxValue = selectBox.options[selectBox.selectedIndex].value;
    console.log(selectedBoxValue)
    let myChildNode = document.getElementById("list").childNodes;
    for (let i = 0; i < myChildNode.length; i++) {
        if (selectedBoxValue == 1) {
            myChildNode[i].classList.add("itemColorMaroon");
        }
        else if (selectedBoxValue == 2) {
            myChildNode[i].classList.add("itemColorPink");
        }
        else if (selectedBoxValue == 3) {
            myChildNode[i].classList.add("itemColorGreen");
        }
        else if (selectedBoxValue == 0){
            myChildNode[i].classList.remove;
        }
    } 
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
        div.innerText = items[i].title;
        divDate.innerText = items[i].date;
        divDate.classList.add("date");
        ul.appendChild(li);
        li.appendChild(div);
        li.appendChild(divDate);
        // let button = document.createElement("button");
        let img = document.createElement("img");
        // button.classList.add("deleteBut");
        img.classList.add("deleteImg");
        img.src = "https://maxcdn.icons8.com/Share/icon/Very_Basic/delete_sign1600.png";
        // button.appendChild(img);
        li.appendChild(img);

        img.onclick = remove;

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


//old code
// document.getElementById("list").onclick = function(e) {
//     let childIndex = getChildIndex(e.target);
//     console.log(e.target, childIndex)
//     e.target.parentElement.removeChild(e.target);
//     items.splice(childIndex,1);
//     console.log()
    
// }

//code to change color for one button....
// document.getElementById("colorBut").onclick = function(e) {
//     let myChildNode = document.getElementById("list").childNodes;
//     console.log(myChildNode)
//     for (let i = 0; i < myChildNode.length; i++) {
//         myChildNode[i].classList.add("itemcolor");
//     }
// }
