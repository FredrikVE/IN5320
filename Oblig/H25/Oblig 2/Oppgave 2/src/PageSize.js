import React from "react";

function PageSize({ onPageSizeChange }) {
  const handleChange = (event) => {
    onPageSizeChange(Number(event.target.value));
  };

  return (
    <div>
      <label htmlFor="pageSize">Results per page: </label>
      <select id="pageSize" onChange={handleChange} defaultValue={10}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
}

export default PageSize;
