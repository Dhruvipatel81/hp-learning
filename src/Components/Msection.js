import React, { useEffect, useState } from "react";
import axios from "axios";
import Addtasksec from "./Addtasksec";
import "../style/all.css";
import Displaytask from "./Displaytask";
const Msection = () => {
  const [todos, setTodos] = useState([]);
  const getData = () => {
    axios
      .get("http://localhost:5001/todos")
      // .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };
  // fetch("https://jsonplaceholder.typicode.com/todos")
  //   .then((response) => response.json())
  //   .then((json) => localStorage.setItem("formValues", JSON.stringify(json)));
  useEffect(() => {
    getData();
  }, []);
  // listItems = JSON.parse(localStorage.getItem("formValues"));
  var val = Math.floor(1000 + Math.random() * 9000);
  const [header, setHeader] = useState(true);
  // console.log("listItems", listItems)
  // console.log("todos0",todos)
  const [data, setData] = useState({
    title: "",
    tag: "",
    date: "",
    completed: false,
    id: val,
  });
  const tododata = () => {

  };
  return (
    <>
      <div className="mx-3 my-5">
        <div className="row">
          <div className="col-md-3">
            <Addtasksec
              tododata={tododata}
              setTodos={setTodos}
              todos={todos}
              data={data}
              setData={setData}
              header={header}
              setHeader={setHeader}
              getData={getData}
            />
          </div>
          {/* {console.log("console_msection", todos)} */}
          <div className="col-md-9">
            {todos && todos.length > 0 ? (
              <Displaytask
                todos={todos}
                setTodos={setTodos}
                data={data}
                setData={setData}
                header={header}
                setHeader={setHeader}
                getData={getData}
              />
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Msection;
