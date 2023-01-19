import React, { useEffect, useState } from "react";
import axios from "axios";
import Modaldata from "./Modaldata";
import ReactPaginate from "react-paginate";
import Deletemodal from "./Deletemodal";
function PaginatedItems({
  itemsPerPage,
  todos,
  setTodos,
  searchField,
  filyerType,
  setDisplayTodos,
  setChecked,
  checked,
}) {
  const [itemOffset, setItemOffset] = useState(0);
  const [pageData, setPageData] = useState(todos);
  const handlePageCount = (pageDataLength) =>
    pageDataLength && Math.ceil(pageDataLength.length / itemsPerPage);
  const [pageCountData, setPageCountData] = useState(handlePageCount(pageData));
  useEffect(() => {
    setItemOffset(0);
  }, [filyerType]);
  useEffect(() => {
    // setSearchField(todos)
    // console.log("todos2");
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const filterPagination = todos.length !== 0 && todos;
    // searchField && searchField.length > 0 ? searchField : todos;
    // console.log("filterPagination333", searchField);
    setPageData(filterPagination);
    setPageCountData(handlePageCount(searchField));
    // console.log(
    //   "console_selectedFilterData_2",
    //   filterPagination,
    //   searchField,
    //   pageData,
    //   todos
    // );
    const currentItems =
      searchField && searchField.slice(itemOffset, endOffset);
    // console.log("currentItems", currentItems);
    // setSearchField(currentItems);
    setDisplayTodos(currentItems);
    // setTodos(currentItems);
  }, [itemOffset, filyerType, todos]);
  const handlePageClick = (event) => {
    // console.log(event, "event");
    const newOffset = (event.selected * itemsPerPage) % pageData.length;
    setChecked(!checked);
    setItemOffset(newOffset);
  };
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageCount={pageCountData}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
const Displaytask = ({
  todos,
  setTodos,
  setData,
  data,
  header,
  setHeader,
  datainfo,
  getData,
}) => {
  // console.log(todos, "todosdisplay");
  const [matchid, setMatchid] = useState("");
  const [dataeditable, setDataeditable] = useState(false);
  const [searchField, setSearchField] = useState(todos);
  const [displayTodos, setDisplayTodos] = useState(todos);
  const [checked, setChecked] = useState(false);
  const [filyerType, setFilyerType] = useState("filter");
  // console.log("todos1", displayTodos, todos);
  const [id, setId] = useState("");
  const [editDataObj, setEditDataObj] = useState([]);
  const [editable, setEditable] = useState(false);

  const [deleteid, setDeleteid] = useState("")
  const deleteTodo = (curr) => {
    // setButtonClicks(true)
 const deleteditem = todos.filter((currelem) => {
     
      console.log(curr.id, "currelem");


      // return currelem.id !== curr.id;
    });
    // setTodos(deleteditem);
    // setSearchField(deleteditem);
    // setDisplayTodos(deleteditem);
  //   axios.delete(`http://localhost:5001/todos/${curr.id}`, {}).then(getData());
  // };
  }
const deletemodalopen=(curr)=>{ 
  console.log(curr,"currr")
  // setButtonClicks(true)
  setDeleteid(curr.id)
  
}
 
// useEffect(()=>{
//   deletemodalopen()
// },[])
  const editItem = (curr) => {
    console.log(curr, "idd");
    const editData = todos.filter((currele, index) => {
      // console.log(curr.title,index,id,"curr")
      if (currele.id === curr.id) {
        return currele.id === curr.id;
      }
    });
    setData(editData);
    setEditDataObj(editData);

    const newdata = { ...editData[0] };
    const Fid = newdata.id;
    console.log(Fid, "Fid");
    setId(curr.id);
    setMatchid(Fid);

    setDataeditable(true);
    setEditable(true);
    setHeader(false);
  };
  const statuschange = (curr) => {
    // setFilyerType(curr);
    const neObj = { ...curr };
    neObj.completed = !curr.completed;
    // if (curr.completed === false) {
    //   neObj.completed = true;
    // } else {
    //   neObj.completed = false;
    // }
    // console.log("console_newTodo", curr, neObj);
    const newTodo = [...todos];
    var foundIndex = todos.findIndex((x) => x.id === neObj.id);
    newTodo[foundIndex] = neObj
    const newDisplayTodo = [...displayTodos];
    var foundIndex = displayTodos.findIndex((x) => x.id === neObj.id);
    newDisplayTodo[foundIndex] = neObj;
    // console.log("console_newTodo_00", newTodo);
    axios
      .put(`http://localhost:5001/todos/${curr.id}`, neObj)
      .then(function (response) {
        // console.log("console_response",newTodo, neObj);
        getData();
        setChecked(!checked);
        // setSearchField(newTodo);
        // setDisplayTodos(newDisplayTodo);
        setTodos(newTodo);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };
  const searchtask = (e) => {
    console.log(e.target.value, "valuess");
    setFilyerType(e.target.value);

    const filtered = todos.filter((item) => {
      return item.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    console.log(filtered, "filtered22");
    setSearchField(filtered);
    console.log(searchField, "filtered2");
    // setDisplayTodos(filtered);
    console.log(displayTodos, "todo23");
  };
  const sortOptions = ["ascending", "descending"];
  const sortingData = (e) => {
    // console.log(e.target.value, "options");
    setFilyerType(e.target.value);
    // console.log("searchField", searchField);
    const netarray = [...todos];
    if (e.target.value === "ascending") {
      const ascSorting = netarray.sort((a, b) => (a.title > b.title ? 1 : -1));
      // console.log(ascSorting, "ascSorting");
      setSearchField(ascSorting);
      // setDisplayTodos(ascSorting);
    } else if (e.target.value === "descending") {
      const desSorting = netarray.sort((a, b) => (a.title < b.title ? 1 : -1));
      setSearchField(desSorting);
      // setDisplayTodos(desSorting);
    } else {
      setSearchField(netarray);
      // setDisplayTodos(netarray);
    }
  };
  // console.log(displayTodos, "displayTodos12222");
  const filterOption = ["pending", "completed"];
  useEffect(() => {
    setSearchField(todos);
  }, [todos]);
  const filterList = (e) => {
    // console.log(e.target.value, searchField);
    const targetValue = e.target.value;
    setFilyerType(targetValue);
    // console.log(targetValue, "targetValue");
    const FilterArray = [...todos];
    let selectedFilterData;
    if (targetValue === "completed") {
      selectedFilterData = FilterArray.filter((item) => {
        return item.completed === true;
      });
      setSearchField(selectedFilterData);
      // setDisplayTodos(selectedFilterData);
    } else if (targetValue === "pending") {
      selectedFilterData = FilterArray.filter((item) => {
        return item.completed === false;
      });
      setSearchField(selectedFilterData);
      // setDisplayTodos(selectedFilterData);
    } else {
      setSearchField(todos);
      // setDisplayTodos(todos);
    }
  };
  return (
    <>
      <div className="second-display-task">
        <div className="second-part-1 shadow p-3 bg-white rounded">
          <div className="row">
            <div className="col-md-2">
              <select
                className="form-select  mt-3  p-1 pt-2 filter-todos"
                onChange={filterList}
                id="filterdata"
                aria-label="Default select example"
              >
                <option>filter</option>
                {filterOption.map((option, index) => {
                  return <option key={index}>{option}</option>;
                })}
              </select>
            </div>
            <div className="col-md-2">
              <select
                className="form-select mt-3 p-1 pt-2"
                onChange={sortingData}
                id="sortingdata"
                aria-label="Default select example"
              >
                <option>Sort</option>
                {sortOptions.map((option, index) => {
                  return <option key={index}>{option}</option>;
                })}
              </select>
            </div>
            <div className="col-md-8">
              <form className="form-inline mt-3" style={{ float: "right" }}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    id="searching"
                    placeholder=" task search"
                    aria-label="search"
                    aria-describedby="basic-addon1"
                    onChange={searchtask}
                    autoComplete="off"
                  />
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-search"
                        id="searchincon"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                      </svg>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="todo-li-items shadow p-3 bg-white rounded ">
            <ul className="todo-ul">
              {displayTodos &&
                displayTodos?.map((curr, index) => {
                  return (
                    <li className="todo-li" key={index}>
                      <label htmlFor="">
                        {/* {console.log(filyerType,"filyerType")} */}
                        <input
                          type="checkbox"
                          // checked={curr.completed === true ? true : false}
                          checked={curr.completed}
                          onChange={() => statuschange(curr)}
                          id={curr.id}
                        />
                        <p className={curr.completed === true ? "test" : ""}>
                          {curr.title}
                        </p>
                        <p
                          className={
                            curr.tag === "social"
                              ? "socialtag"
                              : curr.tag === "friends"
                              ? "friendstag"
                              : "freelancetag"
                          }
                        >
                          {curr.tag}
                        </p>
                        {/* <p>{curr.date}</p> */}
                      </label>

                      <div className="delete-icon">
                        <i
                          className="fas fa-edit"
                          data-toggle="modal"
                          data-target="#exampleModalScrollable"
                          onClick={() => editItem(curr)}
                        ></i>

                        {editable &&
                          editDataObj !== undefined &&
                          editDataObj.length > 0 && (
                            <Modaldata
                              dataeditable={dataeditable}
                              editDataObj={editDataObj && editDataObj}
                              todos={todos}
                              matchid={matchid}
                              setTodos={setTodos}
                              data={data}
                              setData={setData}
                              header={header}
                              setSearchField={setSearchField}
                              setDisplayTodos={setDisplayTodos}
                              setFilyerType={setFilyerType}
                            />
                          )}
                        <i
                          className="fa fa-trash"
                          aria-hidden="true"
                          // onClick={(e) => deleteTodo(curr,e)}
                          onClick={()=>deletemodalopen(curr)}
                          data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
                         
                        </i>
                        {/* {console.log(buttonClicks,"buttonClicks")} */}
                        <Deletemodal
                          deletedDataId={curr.id}
                          setDeleteid={setDeleteid}
                          todos={todos}
                          setSearchField={setSearchField}
                          setDisplayTodos={setDisplayTodos}
                          getData={getData}
                          deleteid={deleteid}
                          setTodos={setTodos}
                          />
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
          {todos && todos.length > 0 && (
            <PaginatedItems
              itemsPerPage={4}
              todos={todos}
              setDisplayTodos={setDisplayTodos}
              setSearchField={setSearchField}
              setTodos={setTodos}
              searchField={searchField}
              filyerType={filyerType}
              displayTodos={displayTodos}
              setChecked={setChecked}
              checked={checked}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Displaytask;
