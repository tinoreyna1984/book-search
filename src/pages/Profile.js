import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export const Profile = () => {
  const { user } = useAuth0();
  //console.log(user);
  return (
    <div className="container">
      <div className="card mb-3 mt-3" style={{ maxWidth: "540px" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={user.picture}
              className="img-fluid rounded"
              alt={user.nickname}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{`${user.name}`}</h5>
              <h6 className="card-title">{`${user.nickname}`}</h6>
              <p className="card-text">
                <small className="text-muted">Email: {user.email}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
