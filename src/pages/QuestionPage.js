import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { QuestionContext } from "../QuestionContext"
import { ENVContext } from "../ENVContext"
import axios from "axios";
import { Link } from "react-router-dom";


export function QuestionPage() {
  const { user } = useContext(UserContext);
  const { env } = useContext(ENVContext);
  const { question_id} = useContext(QuestionContext);

  const [ question, setQuestion] = useState({question: "", answers: {content: ""}});
  const [ answers, setAnswers] = useState([]);
  
  const [ newanswer_content, setNewAnswer_content] = useState("");


  const newAnswer = async (e) => {
    //e.preventDefault();
    
    const newanswer = { 
      "question_id": question_id.toString(),
      "answerer_id": user.id.toString(),
      "content": newanswer_content,
    }
    //https://stackandflow-backend.herokuapp.com/api/
    axios.post(env + 'newanswer', newanswer)    
  }
  
  useEffect (() => {
      if(question_id){
        const question_req = {
          id: question_id.toString(),
        }
          //https://stackandflow-backend.herokuapp.com/api/getquestion
          axios.post(env + 'getquestion', question_req)
          .then(res => {
            const response = res.data;
            setQuestion(response);
            setAnswers(response.answers);
          })
      }
      return 
  }, []);

  let addanswer;
  let askquestion;
  let upvotesBTN;
  let downvotesBTN;
  if(user){
    askquestion = (
      <Link to="/newquestion" className="btn btn-primary float-end">Ask Question</Link>
    )
    addanswer = (
      <div className="d-flex justify-content-end">
        <form className="form-control">
          <input type="text" className="form-control my-1" placeholder="Write a comment." required
                    onChange={e => setNewAnswer_content(e.target.value)}></input>
          <Link to="/questionroute" className="btn btn-primary my-1" onClick={newAnswer}>Comment</Link>
        </form>
      </div>
    )
    upvotesBTN = (
      <button className="btn btn-success">UP</button>
    )
    downvotesBTN = (
      <button className="btn btn-danger">DOWN</button>
    )
  }

  let answers_print;

  if(answers){
    answers_print = (<div>
      {answers.map((answer, index) => (
      <div className="d-flex justify-content-end border-bottom m-2 p-1 ">
        {answer.content} - 
        <div className="text-black-50">
          {answer.answerer_name}
          <div>{answer.date_time}</div>
        </div>
      </div>
    ))}
      </div>
    )}else{
      answers_print = (<div className="d-flex justify-content-end border-bottom m-2 p-1 ">No Answers</div>)
    }

  let question_content;

  if(question_id){
      question_content = (
        <div className="p-5">
          <div className="container p-3 border-bottom">
                <div className="row">
                    <div className="col-md-10">
                        <div className="container">
                          <h1>{question.question.title}</h1>
                        </div>
                    </div>
                    <div className="col-md-2 ">
                      <h5 className="text-end text-black-50">{question.question.questioner_name}</h5>
                      <div className="text-end text-black-50">{question.question.date_time}</div>
                      <div className="my-2">{askquestion}</div>
                    </div>
                </div>
          </div>
          <div className="container px-2">
                <div className="row border-bottom border-start m-4 p-4">
                    <div className="col-md-2">
                      <div  className="row">
                        <div className="col text-center">
                          <h1 className="text-success">{question.question.upvotes ? question.question.upvotes.toString() : 0 }</h1>
                          {upvotesBTN}
                        </div>
                        <div className="col text-center">  
                          <h1 className="text-danger">{question.question.downvotes ? question.question.downvotes.toString() : 0 }</h1>
                          {downvotesBTN}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-10">
                        <div>
                          {question.question.content}                  
                        </div>
                    </div>
                </div>
                <div className="row">
                  <h5 className="d-flex justify-content-end px-4">ANSWERS:</h5>
                    {answers_print}
                    {addanswer}
                </div>
          </div> 
        </div>
        )
      } else {
        question_content = (
          <div>
            Question Not Selected! (click on question at Home page)
          </div>
        )
      }

  return (
    <div>
      {question_content}
    </div>
  );
  }
