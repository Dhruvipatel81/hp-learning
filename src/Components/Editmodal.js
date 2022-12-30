import React from 'react'

const Editmodal = ({ title,tag,date,setData,data ,id,dataeditable ,idnew,adddata}) => {
  
    // console.log(adddata,idnew,adddata,"dataset")

    if(dataeditable===true){
      // console.log("checked true")
      // console.log(adddata,"console_12")
      // const obj={...adddata}
      setData(adddata[0]) 
      // setData(obj[idnew])
      // // console.log(obj[idnew],"obj")
      // const todo console.log("console_data_00", todos);sData = data && [...todos, data];
     
      // setTodos(todosData)
      // localStorage.setItem("formValues", JSON.stringify(todosData)); 
}

  return (
    <>
          <div className="modal fade" id="exampleModalScrollable" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-scrollable" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalScrollableTitle">Add task</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
         
            <div className="row">
              <div className="col-md-2 ml-3">
                <p>task</p>
              </div>
              <div className="col-md-8">
              
                <input className="input-all" id="input-task" type="text" name="title" value={data.title} placeholder="Add Task" />
                <span id="task-error"></span>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-2 ml-3">
                <p>tags</p>
              </div>
              <div className="col-md-8">
                <select className="form-select input-all" id="input-tags" name="tag" value={data.tag}>
                  <option value="">select</option>
                  <option value="freelance">freelance</option>
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
                <input className="input-all" id="input-date" name="date" type="date" value={data.date}/>
                <span id="error-date"></span>
              </div>
            </div>
        
            <span id="error-show">**please filled all the field.</span>
            <button type="button" data-dismiss="modal" aria-label="Close"
              style={{marginTop: "20px"}} id="addtask" className="mt-3">Add</button>
             
          </div>
     
        </div>
      </div>
    </div>
    </>
  )
}
export default Editmodal
