let inputtask = document.getElementById("input-task");
let inputtags = document.getElementById("input-tags");
let deadlines = document.getElementById("input-date");
let optionsFilters = document.querySelectorAll(".filter-todos option");
let AddTaskButton=document.getElementById("addtask");
let listItems = JSON.parse(localStorage.getItem("todo-items"));
let todoul = document.querySelector(".todo-ul");
let errorShow=document.getElementById("error-show");
let edit1;

let iseditdata = false;
let pageStart = 0;
let pageEnd = 5;
var prevbutton = document.getElementById("btn_prev");
var nextbutton = document.getElementById("btn_next");
$(document).ready(function () {
  localStorage.setItem("todo-items", JSON.stringify(listItems));
  listItems = JSON.parse(localStorage.getItem("todo-items"));
  console.log("console_item_list", listItems);
  showdata(listItems);
});

//                            //step 1 top store the data in local storage

function additems() {
  let taskname = inputtask.value;
  let tasktag = inputtags.value;
  let deadline = deadlines.value;


  // console.log("console_data", taskname, iseditdata);
  if (taskname !== "" && tasktag !== "" && deadline !== "") {
    if (!iseditdata) {
      console.log("console_data_1")
      if (!listItems) {
        listItems = [];
      }
      inputtask.value = "";
      inputtags.value = "";
      deadlines.value = "";
      var val = Math.floor(1000 + Math.random() * 9000);
      //  let iseditdata=false;
      let taskinfo = { id: val, name: taskname, tag: tasktag, deadline: deadline, status: "pending" };
      listItems.push(taskinfo);
      localStorage.setItem("todo-items", JSON.stringify(listItems));
    }

    else {
      //  let iseditdata=false;
      listItems[edit1].name = taskname;
      listItems[edit1].tag = tasktag;
      listItems[edit1].deadline = deadline;
      // console.log(listItems, "frr");
    }
  }
 
 
  
  localStorage.setItem("todo-items", JSON.stringify(listItems));
  listItems = JSON.parse(localStorage.getItem("todo-items"));
  document.location.reload();
  showdata("all");

  closeModal();



}
  //                              //close modal for inputdata
function closeModal() {
 
  $('#exampleModalScrollable').modal('hide');
  document.location.reload();
  
}
  //                              //open modal for inputdata
function openModal() {
  $('#exampleModalScrollable').modal('show');
}
//2                                 show data on display (1)

//get data in console from local storage
// function showdata(){
//   listItems.forEach((todo,id) =>{ 
//     console.log(todo,id);
//   });

// }
// showdata();




//                              //pagination
let pagenumbers = document.getElementById("page");
pagenumbers.innerHTML = pageStart + 1 + " - " + (pageStart + pageEnd) + " of " + listItems.length;



if (listItems.length <= pageEnd) {
  nextbutton.disabled = true;
  pagenumbers.innerHTML = pageStart + 1 + " - " + listItems.length + " of " + listItems.length;
}

//                            //prevpage
function prevPage() {
  // if(currentpage>1){
  pageStart = pageStart - 5;
  pageEnd = pageEnd - 5;


  var selectedValue = filterdata.options[filterdata.selectedIndex].value;
  const listItemsAll = JSON.parse(localStorage.getItem("todo-items"));
  const data = listItemsAll.filter((item) => item.status === selectedValue);
  listItemsNew = selectedValue !== "all" ? data : listItemsAll;
  showdata(listItemsNew);

  pagenumbers.innerHTML = pageStart + 1 + " - " + (pageEnd) + " of " + listItems.length;

  if (pageStart <= 1) {
    prevbutton.disabled = true;
    nextbutton.disabled = false;

  }

  if (listItemsNew.length <= pageEnd) {
    pagenumbers.innerHTML = pageStart + 1 + " - " + listItemsNew.length + " of " + listItemsNew.length;
    nextbutton.disabled = true;
    prevbutton.disabled = true;
  }
  if (listItemsNew.length > pageEnd) {
    pagenumbers.innerHTML = pageStart + 1 + " - " + pageEnd + " of " + listItemsNew.length;
    nextbutton.disabled = false;
    prevbutton.disabled = true;
  }
  if (pageStart > 1) {
    nextbutton.disabled = false;
    prevbutton.disabled = false;

  }
}
//                                     //nextpage
function nextPage() {

  pageStart = pageStart + 5;

  pageEnd = pageEnd + 5;
  prevbutton.disabled = false;
  var selectedValue = filterdata.options[filterdata.selectedIndex].value;
  const listItemsAll = JSON.parse(localStorage.getItem("todo-items"));
  const data = listItemsAll.filter((item) => item.status === selectedValue);
  listItemsNew = selectedValue !== "all" ? data : listItemsAll;

  showdata(listItemsNew);


  console.log(pageStart, "pageStart");

  pagenumbers.innerHTML = pageStart + 1 + " - " + (pageEnd) + " of " + listItems.length;
  if (pageEnd >= listItems.length) {
    nextbutton.disabled = true;
    pagenumbers.innerHTML = pageStart + 1 + " - " + listItems.length + " of " + listItems.length;
  }


  if (listItemsNew.length <= pageEnd) {
    pagenumbers.innerHTML = pageStart + 1 + " - " + listItemsNew.length + " of " + listItemsNew.length;
    nextbutton.disabled = true;

  }
  if (listItemsNew.length > pageEnd) {
    pagenumbers.innerHTML = pageStart + 1 + " - " + pageEnd + " of " + listItemsNew.length;
    nextbutton.disabled = false;

  }

}
////////////////
optionsFilters.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showtodo(btn.value);
  })
})
//////////
//3 
//                                //show data in html(2)
function showdata(optionsFilter) {
  let li = "";

  if (optionsFilter) {
    console.log("console_data_33", optionsFilter)
    optionsFilter.forEach((todo, id) => {
      // console.log(pageStart,"pageStart");
      console.log(id)
      console.log(pageStart, "pageStart1111", pageEnd)
      if (id >= pageStart && id < pageEnd) {
        let iscomplete = todo.status == "completed" ? "checked" : "";
        let iscompletetask = todo.status == "completed" ? "bcolor" : "";
        let istagsocial = todo.tag == "social" ? "socialtag" : "";
        let isfreelance = todo.tag == "freelance" ? "freelancetag" : "";
        let isfriends = todo.tag == "friends" ? "friendstag" : "";
        console.log(optionsFilter, "aaaa")

        li += ` <li class="todo-li ${iscompletetask}" id="todo-list-li-${id}">
                    <label for="${id}">
                    <input onclick="update(${todo.id})" type="checkbox" id="${todo.id}" class="checkboxes" ${iscomplete}>
                      <h6 class="name-item ${iscomplete}" id="name-${id}">${todo.name}</h6>
                    </label>
                    <div class="delete-icon">
                    <h6 class="tag-li${id} ${istagsocial} ${isfreelance} ${isfriends}" >${todo.tag}</h6>
                    <i onclick="editdata(${id},'${todo.name}','${todo.tag}','${todo.deadline}')" style="margin-right: -109px;" class="fa fa-pencil-square-o"></i>
                      <i class="fa fa-trash" id="${id}" aria-hidden="true" onclick="openmodel(${id})"></i>
                    </div>
                    
<div class="modal fade" id="exampleModalCenter-${id}" tabindex="-1"  id="${id}" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Delete</h5>
        <button type="button" class="close" onclick="hidemodel(${id})" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Are you sure you want to delete this item?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" onclick="hidemodel(${id})" data-dismiss="modal">Close</button>
        <button type="button" onclick="deleted(${id})" id="${id}" data-dismiss="modal" class="btn btn-primary">yes delete</button>
      </div>
    </div>
  </div>  
</div>
                  </li>`
        // }
      }
    });
  }
  todoul.innerHTML = li;
 
  if (listItems.length <= pageEnd) {
    pagenumbers.innerHTML = pageStart + 1 + " - " + (listItems.length) + " of " + listItems.length;
  }
  if (pageEnd < listItems.length) {
    pagenumbers.innerHTML = pageStart + 1 + " - " + pageEnd + " of " + listItems.length;
  }
}

//4                     //change color and text on complete
function updated(selectedtask) {
  let taskname = selectedtask.parentElement.lastElementChild;
  let bcolor = selectedtask.parentNode.parentNode;
  console.log(taskname);
  console.log(bcolor);


  console.log(taskname);
  if (selectedtask.checked) {
    taskname.classList.add("checked");
    bcolor.classList.add("bcolor");
  }
  else {
    taskname.classList.remove("checked");
    bcolor.classList.remove("bcolor");

  }
  localStorage.setItem("todo-items", JSON.stringify(listItems));

}
//                          //change status
function update(id) {
  // let name = document.getElementById(`name-${id}`);
  var selectedValue = filterdata.options[filterdata.selectedIndex].value;
  // console.log("name","djcidk");
  let check = document.getElementById(id);
  let newArr;
  const itemIndex = listItems.length > 0 && listItems.findIndex((item) => item.id === id);
  console.log("console_item_22", listItems, itemIndex, check.checked, id, selectedValue);
  // console.log(listItems.findIndex((item) => item.id === id),"listItems.findIndex((item) => item.id === id)")
  const listItemsNew = [...listItems];
  console.log("console_item_223", listItemsNew);
  if (check.checked) {
    listItemsNew[itemIndex].status = "completed";

  }
  else {
    console.log("console_item_pending_1", listItems);
    listItemsNew[itemIndex].status = "pending";

  }
  console.log("console_item_pending_3", listItemsNew)
  localStorage.setItem("todo-items", JSON.stringify(listItemsNew));
  // console.log(selectedValue, "selectedValue")
  document.getElementById('filterdata').getElementsByTagName('option')[0].selected = 'selected';
  showdata(listItemsNew);
  pagenumbers.innerHTML = pageStart + 1 + " - " + (pageStart + pageEnd) + " of " + listItems.length;
  prevbutton.disabled = true;

  if (listItems.length > pageEnd) {
    nextbutton.disabled = false;
  }

}

//                                  //delete items
function deleted(selected) {
  // let idnew=document.getElementById(`${id}`)


  listItems.splice(selected, 1);
  localStorage.setItem("todo-items", JSON.stringify(listItems));
  document.location.reload();
  showdata();
  hidemodel();
}
//                            //editdata
function editdata(editid, editname, edittag, editdeadline) {
  openModal();
  // showdata();
  edit1 = editid;
  // console.log("console_data_4", editid, editname, edittag, editdeadline)
  iseditdata = true;
  inputtask.value = editname;
  inputtags.value = edittag;
  deadlines.value = editdeadline;
  console.log('console_data_2', listItems)
  localStorage.setItem("todo-items", JSON.stringify(listItems));
  showdata(listItems);

}
$('#exampleModalScrollable').on("hidden.bs.modal", function () {
  showdata();
  inputtask.value = "";
  inputtags.value = "";
  deadlines.value = "";
});
//                                                   //searching data
window.addEventListener("load", () => {
  var filter = document.getElementById("searching"); // search box
  filter.onkeyup = (e) => {
    console.log(e);
    console.log(e.target.value);

    var inputdata = e.target.value.toUpperCase();
    console.log(inputdata);

    var maindata = document.querySelectorAll(".name-item");
    console.log(maindata);
    maindata.forEach(function (items) {
      console.log(items.textContent.toUpperCase().indexOf(inputdata),"items.textContent.toUpperCase().indexOf(inputdata)");

      if (items.textContent.toUpperCase().indexOf(inputdata) != -1) {
        items.closest("li").style.display = "flex";
      }
      else {
        items.closest("li").style.display = "none";
      }
    })
  }
});
//                                              //filter list

// console.log(nameitems,"nameitems")
function pendingdata() {
  const datas = document.getElementsByClassName("todo-li");
  alert("abccc")
  let filtering = [];
  for (let i = 0; i < datas.length; i++) {
    if (listItems[i].status == "pending") {
      filtering.push(datas[i]);
    }
  }
  showdata("pending");
}
//                                         // filter todo list 
function filteringdata() {
  pageStart = 0;
  pageEnd = 5;
  var selectedValue = filterdata.options[filterdata.selectedIndex].value;
  const listItemsAll2 = JSON.parse(localStorage.getItem("todo-items"));
  const data1 = listItemsAll2.filter((item) => item.status === selectedValue);
  listItemsNew = selectedValue !== "all" ? data1 : listItemsAll2;
  console.log(listItems, "listItems = selectedValue")
  showdata(listItemsNew);

  if (listItemsNew.length <= pageEnd) {
    pagenumbers.innerHTML = pageStart + 1 + " - " + listItemsNew.length + " of " + listItemsNew.length;
    nextbutton.disabled = true;
    prevbutton.disabled = true;
  }
  if (listItemsNew.length > pageEnd) {
    pagenumbers.innerHTML = pageStart + 1 + " - " + pageEnd + " of " + listItemsNew.length;
    nextbutton.disabled = false;
    prevbutton.disabled = true;
  }
}


//                                     //sorting to do list

function sortList() {
  var allData, labels, switching, i, x, y, shouldSwitch;
  var dataa = sortingdata.options[sortingdata.selectedIndex].value;
  console.log(dataa, "dataa");
  allData = document.getElementsByClassName("todo-li");
  console.log(allData, "alldata")
  switching = true;
  if (dataa == "nofilter") {
    showdata();
  }
  else if (dataa == "ascending") {
    while (switching) {

      switching = false;
      labels = document.getElementsByTagName("label");
      console.log(labels);

      for (i = 0; i < (allData.length - 1); i++) {

        shouldSwitch = false;


        x = labels[i].getElementsByTagName("h6")[0];
        y = labels[i + 1].getElementsByTagName("h6")[0];

        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {

          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {

        allData[i].parentNode.insertBefore(allData[i + 1], allData[i]);
        switching = true;
      }
    }
  }
  else {
    while (switching) {

      switching = false;
      labels = document.getElementsByTagName("label");
      console.log(labels);

      for (i = 0; i < (allData.length - 1); i++) {

        shouldSwitch = false;


        x = labels[i].getElementsByTagName("h6")[0];
        y = labels[i + 1].getElementsByTagName("h6")[0];

        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {

          shouldSwitch = true;
          break;
        }


      }
      if (shouldSwitch) {

        allData[i].parentNode.insertBefore(allData[i + 1], allData[i]);
        switching = true;
      }

    }
  }
}

window.onload = function () {
  prevbutton.disabled = true;
}
function openmodel(id) {
  console.log(id, "new")
  var newid = id;
  console.log(newid, "newid")

  $(`#exampleModalCenter-${id}`).modal('show');
}

function hidemodel(id) {
  $(`#exampleModalCenter-${id}`).modal('hide');
}

