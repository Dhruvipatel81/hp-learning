import React, { useState, useEffect } from "react";
import Modal from "bootstrap";
import axios from "axios";
const Modaldata = ({
  matchid,
  setTodos,
  todos,
  first,
  header,
  editDataObj,
  setData,
  data,
  setSearchField,
  setDisplayTodos,
  setFilyerType,
}) => {
  // let listItems = JSON.parse(localStorage.getItem("formValues"));

  var val = Math.floor(1000 + Math.random() * 9000);
  // console.log("matchid123", matchid);
  useEffect(() => {
    // console.log("header111",header,editDataObj)
    if (!header && editDataObj) {
      setData(editDataObj[0]);
    } else {
      setData({
        title: "",
        tag: "",
        date: "",
        status: "pending",
        id: val,
      });
    }
  }, [editDataObj, header]);
  // console.log(editDataObj,"editDataObj2222")
  // console.log(data,"dataa222")
  // if(dataeditable===true){
  //   setData({
  //     title: edittitle,
  //   tag: edittag,
  //   date: editdate,
  //   status:"pending"
  //   })

  // }

  const taskname = (e) => {
    const { name, value } = e.target;

    setData((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
    // console.log(e.target.value, "dataaa")
  };
  // console.log(data, "dataaa")

  const localstoredata = () => {
    console.log("dydhie2");
    if (header === true) {
      if (data.title !== "" && data.tag !== "" && data.date !== "") {
        if (!todos) {
          todos = [];
        }
        // console.log("console_data", todos);

        //if local storage
        // data deleted then new data n
        // ot be added try to remove next
        //  line code put only data

        const todosData1 = data && [...todos, data];
        console.log(todosData1, "todosData1");
        setTodos(todosData1);
        axios
          .post("https://jsonplaceholder.typicode.com/todos", todosData1)
.then(function (response) { })
          .catch(function (error) {
            console.log(error);
          });
        // JSON.parse(localStorage.getItem("formValues"));
        setData({
          title: "",
          tag: "",
          date: "",
          completed: false,
          id: val,
        });
        // localStorage.setItem("formValues", JSON.stringify(todosData1));

        // axios.post('https://jsonplaceholder.typicode.com/todos', todosData1)
        // .then(function (response) {

        //    listItems= localStorage.setItem("formValues", JSON.stringify(response.data))
        //    listItems = JSON.parse(localStorage.getItem("formValues"));
        // })

        // .catch(function (error) {
        //   // handle error
        //   console.log(error);
        // })

        // JSON.parse(localStorage.getItem("formValues"));
        setSearchField(todosData1);
        setDisplayTodos(todosData1);
        setFilyerType("");
      }
    } else {
      todos.filter((curr) => {
        console.log(curr.id, matchid, "curr222");
        if (matchid && curr.id === matchid) {
          setData({
            title: curr.title,
            tag: curr.tag,
            date: curr.date,
            completed: false,
            id: matchid,
          });

          const newTodo = [...todos];
          var foundIndex = todos.findIndex((x) => x.id === matchid);
          console.log(foundIndex, matchid, todos, "dydhie1");
          newTodo[foundIndex] = {
            title: data.title,
            tag: data.tag,
            date: data.date,
            status: "pending",
            id: matchid,
          };
          console.log(newTodo, todos, "dydhie11");
          setTodos(newTodo);
          // localStorage.setItem("formValues", JSON.stringify(newTodo));
          // JSON.parse(localStorage.getItem("formValuesmatchid"));
          setSearchField(newTodo);
          setDisplayTodos(newTodo);
          setFilyerType("");
          setData({
            title: "",
            tag: "",
            date: "",
            status: "pending",
            id: val,
          });
        }
      });
      // console.log(newTodo, "dydhie")
      //  if(matchid===data.idNew){
      //   console.log(data.idNew,matchid,"console_id")
      //   setData(
      //    { title:data.title,
      //     tag: data.tag,
      //     date: data.date,
      //     status: "pending",
      //     idNew:matchid}
      //   )
      // }
      // setData(data)
      // const todosData = [...todos, ]
      // setTodos(todosData)
      // localStorage.setItem("formValues", JSON.stringify(todosData));
      // setData({
      //   title: "",
      //   tag: "",
      //   date: "",
      //   status: "pending",
      //   idNew: val
      // })
    }
  };
  return (
    <>
      {/* {console.log("printdata",data)} */}
      <div
        className="modal fade"
        id="exampleModalScrollable"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalScrollableTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalScrollableTitle">
                {header ? "Add" : "Edit"} task
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-2 ml-3">
                  <p>task</p>
                </div>
                <div className="col-md-8">
                  <input
                    className="input-all"
                    id="input-task"
                    type="text"
                    name="title"
                    value={data?.title}
                    placeholder="Add Task"
                    onChange={taskname}
                  />
                  <span id="task-error"></span>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-md-2 ml-3">
                  <p>tags</p>
                </div>
                <div className="col-md-8">
                  <select
                    className="form-select input-all"
                    id="input-tags"
                    name="tag"
                    value={data?.tag}
                    onChange={taskname}
                  >
                    <option value="freelance" selected>
                      freelance
                    </option>
                    <option value="social">social</option>
                    <option value="friends">friends</option>
                  </select>
                  <span id="error-tags"></span>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-2 ml-3">
                  <p>deadlines</p>
                </div>
                <div className="col-md-8">
                  <input
                    className="input-all datepicker maxDateToday hasDatepicker"
                    id="input-date"
                    type="date"
                    name="date"
                    value={data?.date}
                    onChange={taskname}
                  />
                  <span id="error-date"></span>
                </div>
              </div>

              <span id="error-show">**please filled all the field.</span>
              <button
                type="button"
                data-dismiss="modal"
                aria-label="Close"
                style={{ marginTop: "20px" }}
                id="addtask"
                className="mt-3"
                onClick={() => {
                  localstoredata();
                }}
              >
                {header ? "Add" : "Edit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modaldata;
