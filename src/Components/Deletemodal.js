import React from "react";
import axios from "axios";
const Deletemodal = ({
  deletedDataId,
  todos,
  deleteid,
  setSearchField,
  setDisplayTodos,
  setTodos,
  getData,
}) => {
  const deleteitem = () => {
    console.log(deleteid, todos, "deletedDataId");
    console.log(todos, "todos");
    const deletedataitem = todos.filter((currelem) => {
      return currelem.id !== deleteid;
    });
    console.log(deletedataitem, "deletedataitem");
    setTodos(deletedataitem);
    setSearchField(deletedataitem);
    // setDisplayTodos(deletedataitem);
    axios.delete(`http://localhost:5001/todos/${deleteid}`, {}).then(getData());
  };

  return (
    <>
      <div
        className="modal fade "
        id="exampleModalCenter"
        tabIndex="-1"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
        
        
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">
                Delete item
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                data-bs-dismiss="modal"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">are you sure to delete item ?</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={deleteitem}
              >
                yes sure!
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                no
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Deletemodal;
