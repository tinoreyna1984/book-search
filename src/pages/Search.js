import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";
import { useForm } from "../hooks/useForm";
import { useFetch } from "../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { bookSearch } from "../utils/bookSearch";
import { openModal } from "../redux/modalSlice";
import { DetailsModal } from "../components/DetailsModal";

export const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = queryString.parse(location.search);
  const { q = "" } = query;
  const [formValues, handleInputChange, handleReset] = useForm({
    searchText: q,
  });
  const { searchText } = formValues;

  useEffect(() => {
    if (q) {
      handleInputChange({
        target: {
          name: "searchText",
          value: q,
        },
      });
      console.log(q);
      return () => {
        console.log("cleanup");
      };
    }
  }, [q, handleInputChange]);

  const { data } = useFetch(
    `https://api.itbook.store/1.0/search/heroes?q=${searchText}`
  );
  const { books } = !!data && data;

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`?q=${searchText}`);
  };

  const modal = useSelector((state) => state.modal.show || false);
  const dispatch = useDispatch();
  useEffect(() => {}, [modal]); // quería controlar el modal, pero no pude
  let bookFetch = {};

  const handleDetails = async (isbn13) => {
    bookFetch = await bookSearch(isbn13);
    dispatch(openModal(bookFetch));
  };

  return (
    <div className="container pb-5">
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
        {/* <button type="submit" className="btn btn-dark d-block me-3">
          Search
        </button> */}
        <button
          type="button"
          onClick={handleReset}
          className="btn btn-dark d-block"
        >
          Clear
        </button>
      </form>
      <div className="row row-cols-1 row-cols-md-3 g-4 pb-5">
        {books &&
          books.map((book) => (
            <div className="col" key={book.isbn13}>
              <div className="card h-100">
                <img
                  src={book.image}
                  className="card-img-top"
                  alt={book.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <h5 className="card-title">{book.subtitle}</h5>
                  <p className="card-text">ISBN: {book.isbn13}</p>
                  <p className="card-text">Price: {book.price}</p>
                  <button
                    className="btn btn-dark"
                    onClick={() => handleDetails(book.isbn13)}
                  >
                    See more details
                  </button>
                  <a
                    href={book.url}
                    className="btn btn-dark ms-2"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Buy
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
      {modal && <DetailsModal />}
    </div>
  );
};
