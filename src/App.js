import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import { Nav } from "./components/Nav";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { MyProfile } from "./pages/MyProfile";
import { NewQuestion } from "./pages/NewQuestion";
import { QuestionPage } from "./pages/QuestionPage";

import { UserContext } from "./UserContext";
import { QuestionContext } from "./QuestionContext"
import { ENVContext } from "./ENVContext"

function App() {

  const [user, setUser] = useState(null);
  const [question_id, setQuestion_id] = useState(null);
  const [env] = useState("https://stackandflow-backend.herokuapp.com");

  const user_val = useMemo(() => ({ user, setUser }), [user, setUser]);
  const question_val = useMemo(() => ({ question_id, setQuestion_id }), [question_id, setQuestion_id]);
  const env_val = useMemo(() => ({ env }), [ env ]);

  return (
    <div className="App">
      <Router>
      <div>
        
        <UserContext.Provider value={env_val}>
        <ENVContext.Provider value={user_val}>
          <Nav/>

          
          <Route path="/login/" component={Login} />
          <Route path="/register" component={Register}/>
          <Route path="/myprofile" component={MyProfile}/>
          <Route path="/newquestion" component={NewQuestion}/>
          
          <QuestionContext.Provider value={question_val}>
            <Route path="/" exact component={Home} />
            <Route path="/questionpage" component={QuestionPage}/>
          </QuestionContext.Provider>
        </ENVContext.Provider>
        </UserContext.Provider>
      </div>
    </Router>
    </div>
  );
}

export default App;
