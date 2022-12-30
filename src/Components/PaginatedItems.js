import React, { useState } from "react";
import ReactPaginate from "react-paginate";
const PaginatedItems = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = todos.slice(itemOffset, endOffset);
  // console.log("currentItems", currentItems);
  // setSearchField(currentItems)
  const pageCount = Math.ceil(todos.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % todos.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);

    return (
      <>
        {/* <Items currentItems={currentItems} /> */}
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </>
    );
  };
};

export default PaginatedItems;
