import React from "react";

export const Footer = () => {
  return (
    <div className="container-fluid position-fixed" id="footer">
      <div className="container">
        <p className="text-light mt-2">
          <a className="link-light" href="https://tinexlab.com/" target="_blank" rel="noreferrer">
            TinexLab
          </a>
          , © {new Date().getFullYear()}.{" "}
          <a className="link-light" href="https://itbook.store/" target="_blank" rel="noreferrer">
              Real IT BookStore here.
          </a>.{" "}
          You can also check GitHub repo of this site here.
        </p>
      </div>
    </div>
  );
};
