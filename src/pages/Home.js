import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { QuestionContext } from "../QuestionContext"
import { ENVContext } from "../ENVContext"
import { Link } from "react-router-dom";


export function Home() {
  const { user } = useContext(UserContext);
  const { env } = useContext(ENVContext);
  const { question_id, setQuestion_id } = useContext(QuestionContext);

  const [ questions, setQuestions] = useState([]);

  const [ lastQuestion, setLastQuestion] = useState("");

  const [redirect, setRedirect] = useState(false);


  useEffect (() => {
    //https://stackandflow-backend.herokuapp.com/api/getquestions
    //http://localhost:8000/api/
    axios.get( env + 'getquestions')
    .then(res => {
      var results = res.data;
      if (questions != []){
        setQuestions(results);
      }
      
    })}, []);

  const update_question_id = (id) => {
    setQuestion_id(id);
    console.log(id);
  }

  let askquestion;

  if(user){
      askquestion = (
        <Link to="/newquestion" className="btn btn-primary float-end">Ask Question</Link>
      )
  }

  return (
    <div className="container p-4">
          <div className="row m-3 border-bottom">
              <div className="col p-0">
                  <div className="container"><h1>Recent Questions</h1></div>
              </div>
              <div className="col py-2">
                  {askquestion}
              </div>
          </div>
          <div className="row">
              <div className="col-md-8">
                  <div className="container">
                      {questions.map((question, index) => (
                        <Link to="/questionpage" onClick={(() => update_question_id(question.id))} id={question.id} className="nav-link"><div className="d-block py-3 px-4 bg-secondary bg-gradient text-white  rounded" key={question.id} id={question.id}>{question.title} - {question.questioner_name}</div></Link>
                      ))}
                      {console.log(questions, "global questions var")}
                  </div>
              </div>
              <div className="col-md-4">
                  <ul>
                      Two Lists
                  </ul>
              </div>
          </div>
    </div>  
  );
}
