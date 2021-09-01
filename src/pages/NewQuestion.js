import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { ENVContext } from "../ENVContext";
import { Link } from "react-router-dom";
import axios from "axios";


export function NewQuestion() {
    const { user } = useContext(UserContext);
    const { env } = useContext(ENVContext);

    const [ newquestion_content, setNewQuestion_content] = useState("");
    const [ newquestion_title, setNewQuestion_title] = useState("");
    


    const newQuestion = async (e) => {
      //e.preventDefault();
      
      const newquestion = { 
        "questioner_id": user.id.toString(),
        "title": newquestion_title,
        "content": newquestion_content,
      }
      //https://stackandflow-backend.herokuapp.com/api/
      //http://localhost:8000/api/newquestion
      
      axios.post(env + 'newquestion', newquestion)    
    }
    

    let askquestion;

    if(user){
      askquestion = (
        <div className="container py-2">
          <div className="container d-flex justify-content-end">
            <form className="form-control p-3">
              <input type="text" className="form-control my-2" placeholder="TITLE" required
                    onChange={e => setNewQuestion_title(e.target.value)}></input>
              <textarea type="text" className="form-control" placeholder="Ask a Question!" required
                    onChange={e => setNewQuestion_content(e.target.value)}></textarea>
              <Link to="/" className="btn btn-primary my-2" onClick={newQuestion}>Submit</Link>
            </form>
          </div>
        </div>
      )
    }else {
      askquestion = (
        <div className="container p-5">
          Log in if you want to ask question!
        </div>
      )
    }


    return (
      <div className="container p-4">
        <div className="container m-3 border-bottom">
          <h1>Ask Question</h1>
        </div>
        {askquestion}
      </div>
    );
  }
