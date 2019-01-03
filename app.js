var items = []; 

//some test data
items.push(new ToDoItem("first thing to do is.."));
items.push(new ToDoItem("another thing to do is.."));
items.push(new ToDoItem("oh what a great idea to do.."));
items.push(new ToDoItem("oh another thing to do.."));
items.push(new ToDoItem("pff so many things I havent done.."));
items.push(new ToDoItem("I ll never get to this one but it's oki.."));
render();

//this is an event handler - for elements that exist when the page loads!
document.getElementById("inputSearch").onkeyup = function(e) {
    if (e.keyCode == 13) {
        mySearch();
    }
}

document.getElementById("input").onkeyup = function(e) {
    if (e.keyCode == 13) {
        addToDoItem();
    }
}     

document.getElementById("clearBut").onclick = function(e) {
    document.getElementById("list").innerHTML = "";
    items = [];
}

document.getElementById("sortBut").onclick = sort;

function mySearch() {
    // Declare vars
    let inputValue = document.getElementById("inputSearch").value;
    // to make the search non case sensitive
    let filter = inputValue.toUpperCase();
    let ul = document.getElementById("list");
    let li = ul.childNodes;
    
    // Loop through list and hide those that dont match the search
    for (let i = 0; i < li.length; i++) {
        let div = li[i].getElementsByTagName("div")[0];
        let divText = div.innerText;

        if (divText.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        }
        else {
            li[i].style.display = "none";
        }
    }
}


function ToDoItem(title) {
    this.title = title;
    let d = new Date();
    this.date = "Edited " + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
    this.backgroundColor = "#FFFFFF";
}

let itemColorCls = null;

document.getElementById("colorBut").onchange = function(e) {
    // Declare variables
    let selectBox = document.getElementById("colorBut");
    let selectedBoxValue = selectBox.value;
    let newItemColorCls = selectedBoxValue;
    let myChildNode = document.getElementById("list").childNodes;

    // Loop through all list items and remove/reassign colors
    for (let i = 0; i < myChildNode.length; i++) {
        if (itemColorCls) {
            myChildNode[i].classList.remove(itemColorCls);
        }

        myChildNode[i].classList.add(newItemColorCls);
    } 

    // Update global variable
    itemColorCls = newItemColorCls;
}


function addToDoItem() {
    let title = document.getElementById("input").value;
    let todoItem = new ToDoItem(title);

    // add the item to our collection/array
    items.push(todoItem);

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

// re-render the list
function render() {
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
        let img = document.createElement("img");
        img.classList.add("deleteImg");
        img.src = "https://maxcdn.icons8.com/Share/icon/Very_Basic/delete_sign1600.png";
        img.title = "Delete"
        li.appendChild(img);

        img.onclick = remove;

        if (i == items.length - 1) { 
            setTimeout(function() {
                li.classList.add("show");
                div.classList.add("show");
                divDate.classList.add("show");    
            }, 10);
        }    
    }
}

function remove(e) {
    let childIndex = getChildIndex(e.target.parentElement);
    e.target.parentElement.remove();
    items.splice(childIndex,1);
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
