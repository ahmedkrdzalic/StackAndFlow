import React, { useContext } from "react";
import { UserContext } from "../UserContext";

export function MyProfile() {
    const { user } = useContext(UserContext);
    
    
    let myprofile_print;
    if(user){
      myprofile_print = (
        <div>
          
        </div>
      )
    }
  
    return (
      <div>
        <div className="container p-4">

          {myprofile_print}

        </div>
      </div>
    );
  }
  

  //{JSON.stringify(user, null, 2)}