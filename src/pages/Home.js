import { Carousel } from "react-responsive-carousel";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../redux/modalSlice";
import { DetailsModal } from "../components/DetailsModal";
import { bookSearch } from "../utils/bookSearch";

export const Home = () => {
  const [items, setItems] = useState([]);
  const [joke, setJoke] = useState("");

  let bookFetch = {};

  useEffect(() => {
    fetch("https://api.itbook.store/1.0/new")
      .then((response) => response.json())
      .then(
        (data) => setItems(data.books),
        (e) => console.log(e)
      );
  }, []);

  useEffect(() => {
    fetch("https://geek-jokes.sameerkumar.website/api?format=json")
      .then((response) => response.json())
      .then((data) => setJoke(data.joke));
  }, []);

  //console.log(joke);
  //console.log(items.map( item => Number(item.price.replace(/[^0-9.-]+/g,"")) ));
  //const {image, isbn13, price, subtitle, title, url} = books;

  const modal = useSelector((state) => state.modal.show || false);
  const dispatch = useDispatch();
  useEffect(() => {}, [modal]); // quería controlar el modal, pero no pude

  const handleDetails = async (isbn13) => {
    bookFetch = await bookSearch(isbn13);
    dispatch(openModal(bookFetch));
  };

  return (
    <div className="container-fluid">
      <div className="row mt-3 text-left">
        <h1 className="ps-5">New books</h1>
      </div>
      <div className="row mt-1 p-3 mb-4 g-2">
        <div className="col-7">
          <Carousel
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            stopOnHover={false}
            autoPlay={true}
            infiniteLoop={true}
            interval={5000}
            className="px-0"
          >
            {items.map((item) => (
              <div className="card mb-3" key={item.isbn13}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={item.image}
                      className="card-img-top d-block mx-auto"
                      style={{ height: "100%", width: "auto" }}
                      alt={item.title}
                    />
                  </div>
                  <div className="col-md-8 pt-md-5">
                    <div className="card-body align-middle">
                      <h5 className="card-title">{item.title}</h5>
                      <h6 className="card-title">{item.subtitle}</h6>
                      <p className="card-text">ISBN: {item.isbn13}</p>
                      <p className="card-text">Price: {item.price}</p>
                      <button
                        className="btn btn-dark"
                        onClick={() => handleDetails(item.isbn13)}
                      >
                        See more details
                      </button>
                      <a
                        href={item.url}
                        className="btn btn-dark ms-2"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Buy
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
        <div className="col-5">
          <div className="card w-auto h-auto">
            <div className="card-body">
              <h1 className="card-title">Geek joke of the day</h1>
              <p className="card-text">{joke}</p>
            </div>
          </div>
        </div>
      </div>
      {modal && <DetailsModal />}
    </div>
  );
};
