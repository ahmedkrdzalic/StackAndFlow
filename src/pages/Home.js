import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { QuestionContext } from "../QuestionContext"
import { Link } from "react-router-dom";



export function Home() {
  const { user } = useContext(UserContext);
  const { question_id, setQuestion_id } = useContext(QuestionContext);

  const [ questions, setQuestions] = useState([]);
  const [ lastQuestion, setLastQuestion] = useState("");

  const load_questions = async () => {
    await axios.get('http://localhost:8000/api/getquestions')
    .then(res => {
      const response = res.data;
      setQuestions(response);
      //console.log(questions);
    })
  }

  load_questions();

  const update_question_id = (id) => {
    setQuestion_id(id)
  }

  let aksquestion;

  if(user){
      aksquestion = (
          <form action="/newquestion">
              <button type="submit" className="btn btn-primary float-end" >Ask Question</button>
          </form>
      )
  }

  return (
    <div className="container p-4">
          <div className="row m-3 border-bottom">
              <div className="col p-0">
                  <div className="container"><h1>Recent Questions</h1></div>
              </div>
              <div className="col py-2">
                  {aksquestion}
              </div>
          </div>
          <div className="row">
              <div className="col-md-8">
                  <div className="container">
                      {questions.map((question, index) => (
                        <Link to="/questionpage" onClick={(() => update_question_id(question.id))} id={question.id} className="nav-link"><div className="d-block py-3 px-4 bg-secondary bg-gradient text-white  rounded" key={question.id} id={question.id}>{question.title} - {question.questioner_name}</div></Link>
                      ))}                        
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
