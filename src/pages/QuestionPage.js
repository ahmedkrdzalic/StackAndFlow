import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { QuestionContext } from "../QuestionContext"
import { ENVContext } from "../ENVContext"
import axios from "axios";

export function QuestionPage() {
  const { user } = useContext(UserContext);
  const { env } = useContext(ENVContext);
  const { question_id} = useContext(QuestionContext);

  const [ question, setQuestion] = useState({question: "123", answers: {content: "123"}});
  const [ answers, setAnswers] = useState([]);

  
  useEffect (() => {
      if(question_id){
        const question_req = {
          id: question_id.toString(),
        }
        
          axios.post(env + '/api/getquestion', question_req)
          .then(res => {
            const response = res.data;
            setQuestion(response);
            setAnswers(response.answers);
          })
      }
      return 
  }, []);

  let addanswer;
  let aksquestion;
  if(user){
    aksquestion = (
        <form action="/newquestion">
            <button type="submit" className="btn btn-primary float-end" >Ask Question</button>
        </form>
    )
    addanswer = (
      <div className="d-flex justify-content-end">
        <input type="text" className="form-control" placeholder="Write a comment."></input>
        <button className="btn btn-primary mx-2">Comment</button>
      </div>
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
                          <h2>{question.question.title}</h2>
                        </div>
                    </div>
                    <div className="col-md-2 ">
                      <h5 className="text-end text-black-50">{question.question.questioner_name}</h5>
                      <div className="text-end text-black-50">{question.question.date_time}</div>
                      <div className="my-2">{aksquestion}</div>
                    </div>
                </div>
          </div>
          <div className="container px-2">
                <div className="row border-bottom border-start m-4 p-4">
                    <div className="col-md-2">
                      <div  className="row">
                        <div className="col text-center">
                          <h1>{question.upvotes}1</h1>
                          <div className="m-1">Upvotes</div>
                          <button className="btn btn-success">UP</button>
                        </div>
                        <div className="col text-center">  
                          <h1>{question.downvotes}3</h1>
                          <div className="m-1">Downvotes</div>
                          <button className="btn btn-danger">DOWN</button>
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
            Question Not Selected! 
          </div>
        )
      }

  return (
    <div>
      {question_content}
    </div>
  );
  }
