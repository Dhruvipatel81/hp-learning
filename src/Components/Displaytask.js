import React, { useEffect, useState } from "react";
// import Editmodal from './Editmodal'
import Modaldata from "./Modaldata";
import ReactPaginate from "react-paginate";

// import Form from 'react-bootstrap/Form';
function PaginatedItems({
  itemsPerPage,
  todos,
  setDisplayTodos,
  searchField,
  filyerType,
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
    console.log("todos2");
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const filterPagination =
      searchField && searchField.length > 0 ? searchField : todos;
    setPageData(filterPagination);
    setPageCountData(handlePageCount(filterPagination));
    // console.log("console_selectedFilterData_2", searchField, filterPagination);
    const currentItems =
      filterPagination && filterPagination.slice(itemOffset, endOffset);
    console.log("currentItems", currentItems);
    // setSearchField(currentItems);
    // setDisplayTodos(currentItems);
  }, [itemOffset, filyerType]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    // console.log("console_selectedFilterData_3", event);

    const newOffset = (event.selected * itemsPerPage) % pageData.length;
    // console.log("handlechange_newOffset", newOffset, itemsPerPage);
    setItemOffset(newOffset);
  };
  // console.log("handlechange_psgrcont", pageCount)
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        // pageRangeDisplayed={5}
        pageCount={pageCountData}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
const Displaytask = ({ todos, setTodos, setData, data, header, setHeader }) => {
  // JSON.parse(localStorage.getItem("formValues"));
  // console.log("todoitem",listItems)
  const [displayTodos, setDisplayTodos] = useState(todos);
  const [matchid, setMatchid] = useState("");
  const [dataeditable, setDataeditable] = useState(false);
  const [searchField, setSearchField] = useState();


  const [search, setSeach] = useState(false);
  const [filyerType, setFilyerType] = useState("filter");

  // const [ascendingOrder, setascendingOrder] = useState(todos)
  console.log(todos,"todos333")
  console.log("todos1",displayTodos, todos);
const [id, setId] = useState("");
  const [editDataObj, setEditDataObj] = useState([]);
  const [editable, setEditable] = useState(false);
  const deleteTodo = (curr) => {
    const deleteditem = todos.filter((currelem, index) => {
      return currelem.id !== curr.id;
    });
    setTodos(deleteditem);
    // localStorage.setItem("formValues", JSON.stringify(deleteditem));
    // JSON.parse(localStorage.getItem("formValues"));
    setSearchField(deleteditem);
    setDisplayTodos(deleteditem);
  };
  const editItem = (curr) => {
    console.log(curr, "idd");
    const editData = todos.filter((currele, index) => {
      // console.log(curr.title,index,id,"curr")
      if (currele.id === curr.id) {
        return currele.id === curr.id;
      }
    });
    // setData(editData)
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
  // console.log(newdata.idNew,"editData")
  // console.log(matchid, "Matchid");
  const statuschange = (curr, currid) => {
    setFilyerType(curr);
    const neObj = { ...curr };
    console.log(neObj.id, currid, "id222222");

    if (curr.completed === false) {
      neObj.completed = true;
    } else {
      neObj.completed = false;
    }
    // console.log("console_neObj", neObj, index);
    const newTodo = [...todos];
    var foundIndex = todos.findIndex((x) => x.id === neObj.id);

    console.log(foundIndex, neObj.id, "dydhie1");
    newTodo[foundIndex] = neObj;
    // console.log(newTodo, todos, newTodo[foundIndex], "newTodofoundIndex");
    setTodos(newTodo);
    // localStorage.setItem("formValues", JSON.stringify(newTodo));
    setSearchField(newTodo);
    setDisplayTodos(newTodo);
  };

  const searchtask = (e) => {
    // setTargetval(e.target.value)
    setFilyerType(e.target.value);
    setSeach(true);
    let newAraay = todos;
    // console.log("newAraay", newAraay);
    // let  filtered = todos &&  todos.filter(
    let filtered = todos.filter((item) =>
      item.title.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setSearchField(filtered);
    setDisplayTodos(filtered);
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
      setDisplayTodos(ascSorting);
    } else if (e.target.value === "descending") {
      const desSorting = netarray.sort((a, b) => (a.title < b.title ? 1 : -1));
      setSearchField(desSorting);
      setDisplayTodos(desSorting);
    } else {
      setSearchField(netarray);
      setDisplayTodos(netarray);
    }
  };
  // console.log(displayTodos, "displayTodos12222");
  const filterOption = ["pending", "completed"];

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
      setDisplayTodos(selectedFilterData);
    } else if (targetValue === "pending") {
      selectedFilterData = FilterArray.filter((item) => {
        return item.completed === false;
      });
      setSearchField(selectedFilterData);
      setDisplayTodos(selectedFilterData);
    } else {
      setSearchField(todos);
      setDisplayTodos(todos);
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
                        <input
                          type="checkbox"
                          onChange={() => statuschange(curr, curr.id)}
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
                          {curr.completed}
                        </p>
                        <p>{curr.date}</p>
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
                          onClick={() => deleteTodo(curr)}
                        ></i>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
          <PaginatedItems
            itemsPerPage={4}
            todos={todos}
            setDisplayTodos={setDisplayTodos}
            setSearchField={setSearchField}
            setTodos={setTodos}
            searchField={searchField}
            filyerType={filyerType}
          />
        </div>
      </div>
    </>
  );
};

export default Displaytask;
