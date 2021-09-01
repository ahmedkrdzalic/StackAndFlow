import React, { useContext } from "react";
import { UserContext } from "../UserContext";

export function MyProfile() {
  const { user } = useContext(UserContext);
  
  let myprofile_print;
  if(user){
    myprofile_print = (
      <div>
        <div className="container row row-cols-1 row-cols-md-2">
          <div className="col-md-4">
            <div className="card rounded-3 shadow-sm">
              <div className="card-header py-3">
                <h4 className="my-0 fw-normal">Info</h4>
              </div>
              <div className="card-body m-3">
                <h1 className="card-title pricing-card-title ">{user.name} <small className="text-muted fw-light">{user.surname}</small></h1>
                <h10><b>E-mail:</b> {user.email}</h10>
                <br></br>
                <h10><b>ID:</b> {user.id}</h10>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card mb-4 rounded-3 shadow-sm">
              <div className="card-header py-3">
                <h4 className="my-0 fw-normal">Update Info</h4>
              </div>
              <div className="row text-center container">
                

                <div className="row">
                  <div className="col-sm-6 py-3">
                    <label for="firstName" className="form-label">First name</label>
                    <input type="text" className="form-control" id="firstName" placeholder="ex: John" value="" required=""></input>
                  </div>

                  <div className="col-sm-6 py-3">
                    <label for="lastName" className="form-label">Last name</label>
                    <input type="text" className="form-control" id="lastName" placeholder="ex: Doe" value="" required=""></input>
                  </div>

                  <div className="col-12 py-3">
                    <label for="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="john.doe@example.com"></input>
                  </div>
                </div>

                <button type="button" className="btn-primary btn-lg my-3">Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    myprofile_print = (
      <div>
        You are not logged in!
      </div>
    )
  }

  return (
    <div className="container p-4">
      <div className="container m-3 border-bottom">
        <h1>My Profile</h1>
      </div>
      {myprofile_print}
    </div>
  );
}
