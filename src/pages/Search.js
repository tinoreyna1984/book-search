import React from "react";
import { useForm } from "../hooks/useForm";

export const Search = () => {
  const [formValues, handleInputChange, handleReset] = useForm({searchText: ''});
  const {searchText} = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(searchText);
  }

  return (
    <div className="container">
      <h1>Search</h1>
      <form className="d-flex flex-row mb-3" onSubmit={handleSubmit}>
        <input
          type="text"
          name="searchText"
          value={searchText}
          className="form-control me-3"
          id="inputSearch"
          placeholder="Enter a text to search"
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btn-dark d-block me-3">
          Search
        </button>
        <button onClick={handleReset} className="btn btn-dark d-block">
          Clear
        </button>
      </form>
    </div>
  );
};
