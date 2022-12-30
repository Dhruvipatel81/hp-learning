import React, { useEffect, useState } from 'react'
import Addtasksec from './Addtasksec'
import '..//style/all.css'
import Displaytask from './Displaytask'
const Msection = () => {



  let listItems = JSON.parse(localStorage.getItem('formValues'));
  var val = Math.floor(1000 + Math.random() * 9000);

  const [header, setHeader] = useState(true)
  // console.log("listItems", listItems)

  const [todos, setTodos] = useState(listItems);
  // console.log("todos0",todos)
  const [data, setData] = useState({

    title: "",
    tag: "",
    date: "",
    status: "panding",
    idNew: val
  });

  const tododata = () => {

    // setTodos(false)
  }

  return (
    <>
      <div className='container my-5'>
        <div className='row'>
          <div className='col-md-3'>
            <Addtasksec
              tododata={tododata}
              setTodos={setTodos}
              todos={todos}
              data={data}
              setData={setData}
              header={header}
              setHeader={setHeader}
            />
          </div>
          <div className='col-md-9'>
            <Displaytask listItems={listItems}
              todos={todos}
              setTodos={setTodos}
              data={data}
              setData={setData}
              header={header}
              setHeader={setHeader}

            />
          </div>
        </div>

      </div>


    </>
  )
}

export default Msection
