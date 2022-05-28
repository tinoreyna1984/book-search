import { Carousel } from "react-responsive-carousel";
import React, { useEffect, useState } from "react";

export const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://api.itbook.store/1.0/new")
      .then((response) => response.json())
      .then(
        (data) => setItems(data.books),
        (e) => console.log(e)
      );
  }, []);

  //const {image, isbn13, price, subtitle, title, url} = books;

  return (
    <div className="container-fluid">
      <div className="row mt-3 text-center">
        <h1>New books</h1>
      </div>
      <div className="row mt-3 text-center p-3 mb-4">
        <Carousel
          showThumbs={false}
          showIndicators={false}
          showStatus={false}
          stopOnHover={false}
          autoPlay={true}
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
                    <a
                      href={item.url}
                      className="btn btn-dark"
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
    </div>
  );
};