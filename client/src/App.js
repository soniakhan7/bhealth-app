// App.js
import { useState, useEffect } from "react";
import Home from "./LandingPage.js";
import Quiz from "./Quiz.js";
import Results from "./Last-page-of-quiz.js";
import Login from "./Login";


import AccountHistory from "./AccountHistory";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";



const AuthenticatedRoute = ({ children, user, redirectTo }) => {
  if (!user) {
    return (
      <>
        <Navigate to={redirectTo} replace />
        <p>Please login to take the quiz.</p>
      </>
    );
  }
  return children;
};

const LoginRoute = ({ children, user, redirectTo, afterLoginRedirectTo }) => {
  if (user) {
    return <Navigate to={afterLoginRedirectTo || redirectTo} replace />;
  }
  return children;
};

function App() {
  const [name, setName] = useState("");
  const [response, setResponse] = useState("Loading your meal plan...");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []); 

  return (
    <div>
      <BrowserRouter>
        <div>
          
          <Routes>
            <Route path="/" element={<Home user={user}/>} />
            {/* <Route
              path="/login"
              element={
                <LoginRoute user={user} redirectTo="/Quiz">
                  <Login />
                </LoginRoute>
              }
            /> */}

            <Route
              exact
              path="/Quiz"
              element={
                <AuthenticatedRoute user={user} redirectTo="/login">
                  <Quiz name={name} setName={setName} setResponse={setResponse} user={user} />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/Results"
              element={
                <AuthenticatedRoute user={user} redirectTo="/login">
                  <Results response={response} name={name} setName={setName} setResponse={setResponse} />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <LoginRoute user={user} redirectTo="/Quiz" afterLoginRedirectTo="/AccountHistory">
                  <Login />
                </LoginRoute>
              }
            />
            <Route
              path="/AccountHistory"
              element={
                <AuthenticatedRoute user={user} redirectTo="/login">
                  <AccountHistory user={user} />
                </AuthenticatedRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
