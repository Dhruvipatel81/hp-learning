import React, { useState } from "react";
import Modaldata from "./Modaldata";

const Addtasksec = ({
  tododata,
  setTodos,
  todos,
  header,
  setHeader,
  setData,
  data,
  first,
  getData
}) => {
  const [buttonClick, setButtonClick] = useState(false);
  const hadleClick = () => {
    setButtonClick(true);
    setHeader(true);
  };
  return (
    <>
      <div className="first-adding-task">
        <div
          className="card shadow p-3 bg-white rounded"
          style={{ width: "18.5rem" }}
        >
          <button
            type="button"
            className="btn btn-add-task"
            data-toggle="modal"
            data-target="#exampleModalScrollable"
            onClick={hadleClick}
          >
            Add Task
          </button>
          {buttonClick ? (
            <Modaldata
              type="add"
              first={first}
              setData={setData}
              header={header}
              tododata={tododata}
              setTodos={setTodos}
              todos={todos}
              data={data}
              getData={getData}
            />
          ) : (
            ""
          )}
          <div className="scroll">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-envelope"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7
                 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708
                 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 
                 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"
                  />
                </svg>{" "}
                All
              </li>
              <li className="list-group-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-send"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                </svg>
                My Task
              </li>
              <hr />
            </ul>
            <h6 style={{ paddingLeft: "20px", paddingBottom: "2px" }}>Tags</h6>
            <ul className="list-group list-group-flush">
              <li className="list-group-item list-tags">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ color: "rgb(226, 223, 43)" }}
                  width="60"
                  height="60"
                  fill="currentColor"
                  className="bi bi-dot"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                </svg>
                freelance
              </li>
              <li className="list-group-item list-tags">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ color: "rgb(225, 29, 124)" }}
                  width="60"
                  height="60"
                  fill="currentColor"
                  className="bi bi-dot"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                </svg>
                social
              </li>
              <li className="list-group-item list-tags">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ color: "rgb(24, 233, 34)" }}
                  width="60"
                  height="60"
                  fill="currentColor"
                  className="bi bi-dot"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                </svg>
                friends
              </li>
              <li className="list-group-item list-tags">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ color: "rgb(37, 37, 189)" }}
                  width="60"
                  height="60"
                  fill="currentColor"
                  className="bi bi-dot"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                </svg>
                office
              </li>
              <li className="list-group-item list-tags">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ color: "rgb(14, 151, 242)" }}
                  width="60"
                  height="60"
                  fill="currentColor"
                  className="bi bi-dot"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                </svg>
                coding
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addtasksec;
