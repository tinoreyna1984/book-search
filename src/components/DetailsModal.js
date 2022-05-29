import React, { useState, useEffect, useRef } from "react";
import * as bootstrap from "bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../redux/modalSlice";

export const DetailsModal = () => {
  const [modal, setModal] = useState([]);
  const parseExceptionModal = useRef();
  const dispatch = useDispatch();

  const item = useSelector((state) => state.modal || {});
  const {book} = item;
  //console.log(book)

  useEffect(() => {
    const modal = new bootstrap.Modal(parseExceptionModal.current, {
      keyboard: false,
    });
    setModal(modal);
    modal.show();
  }, []);

  const handleClose = () => {
    modal.hide();
    dispatch(closeModal());
  };

  return (
    <div className="py-2">
      <div className="modal" tabIndex="-1" ref={parseExceptionModal}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{book.title}</h4><br/>
              <h5 className="modal-title">{book.subtitle}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body lh-1">
              <p>Authors: {book.authors}</p>
              <p>Publisher: {book.publisher}</p>
              <p>Year: {book.year}</p>
              <p>Description: {book.desc}</p>
              <p>ISBN10: {book.isbn10}</p>
              <p>ISBN13: {book.isbn13}</p>
              <p>Language: {book.language}</p>
              <p>Pages: {book.pages}</p>
              <p>Price: {book.price}</p>
            </div>
            <div className="modal-footer">
              <button
                onClick={handleClose}
                type="button"
                className="btn btn-dark"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
