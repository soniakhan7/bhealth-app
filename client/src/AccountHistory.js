import { useState, useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "./firebaseConfig";
import { Link } from "react-router-dom";
import './nav.css'
import "./AccountHistory.css";
import { faBlackboard } from "@fortawesome/free-solid-svg-icons";

const AccountHistory = ({ user }) => {
  const [quizResults, setQuizResults] = useState([]);

  useEffect(() => {
    // If there is no user, do not try to fetch quiz results
    if (!user) {
      return;
    }

    // Get the user's quiz results from the database
    const quizResultsRef = ref(db, "quizResults");
    onValue(quizResultsRef, (snapshot) => {
      const quizResultsData = snapshot.val();
      if (quizResultsData) {
        const userQuizResults = Object.values(quizResultsData).filter((result) => result.userId === user.uid);
        const sortedQuizResults = userQuizResults.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
        const limitedQuizResults = sortedQuizResults.slice(0, 5);
        setQuizResults(limitedQuizResults);
      }
    });
  }, [user]);

  return (
    <div>
      {/*Nav bar for the page*/}
      <div className="nav" style={{ background: '#0B2027'}}>
          {/*left-side nav*/}
          <div class="left-nav-sec">
              <div class="nav-logo">
              <Link to='/'> <img id="logo-img" src={require("./official-assets/final_logo_alt.png")} alt="logo"/> </Link>
              </div>

          </div>
          {/*right-side nav*/}
          <div class="right-nav-sec">
              <div>
                  <Link className="quiz-cta-btn" to="/Quiz"> Take the quiz </Link>
              </div>
              <div>
                  <Link className="quiz-cta-btn" to="/">Return to home page</Link>
              </div>
              {/* <div>
                  <Link className="quiz-cta-btn" to="/Logout"> Logout </Link>
              </div> */}
          </div>
      </div>
      <div className="account-history-container">
        <h1 className="account-history-heading">Account History</h1>
        <ul className="account-history-list">
          {quizResults.map((result, index) => (
            <li key={index} className="account-history-list-item">
              <div className="account-history-details">
                <p>Diet: {result.diet}</p>
                <p>Goal: {result.betterHealthHelp}</p>
                <p>Allergies: {result.allergies.join(", ")}</p>
                <p>Cuisine: {result.cuisine.join(", ")}</p>
                <p>Unwanted Ingredients: {result.unwantedIngredients.join(", ")}</p>
                <p>Skill Level: {result.cookingLevel}</p>
                <p>Response: {result.response}</p>
                <p>Timestamp: {result.timestamp}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AccountHistory;
