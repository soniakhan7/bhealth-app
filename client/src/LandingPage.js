import React from "react";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import './footer.css'
import './nav.css'
import './home-main.css'
import { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import Popup from './Popup'
import Logout from "./Logout";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebaseConfig";
import "./Login.css";



function Home ({user}) {

    const [mealItems, setMealItem] = useState([])
    const [totalCal, setTotalCal] = useState(0)
    const [buttonPopup, setButtonPopup] = useState(false)
    const [open, setOpen] = useState([true, true, true, true, true, true]);

    {/*Fucntion for Google login. I took this from the login.js page*/}
    const handleGoogleLogin = async () => {
        try {
          await signInWithPopup(auth, provider);
        } catch (error) {
          console.error("Error signing in with Google:", error.message);
        }
    };

    function handleArr(i) {
        const newArr = [...open];

        newArr[i] = !open[i];

        setOpen(newArr);
    }

    const addMealItem = (meal, calories) => {
        if(mealItems.length === 0) {
            setMealItem({mealName: meal, numCalories: calories})
        }
        const next_arr = [...mealItems, {mealName: meal, numCalories: calories}];
        setMealItem(next_arr)
        
    }

    const handleCal = (index, quantity, action) => {
        var additionInt = parseInt(mealItems[index].numCalories, 10);
        var tempCal = totalCal
        if(action === "Add") {
            tempCal += (additionInt * quantity)
        }
        else {
            tempCal -= (additionInt * quantity)
        }
        setTotalCal(tempCal)
    }


    return (
        <div>
            <head>
                <meta charset="UTF-8"/>
                <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Better Health</title>
            </head>
            <body>
            {/*Nav section of site*/}
    <div className="nav">
        {/*left-side nav*/}
        <div class="left-nav-sec">
            <div class="nav-logo">
            <Link to='/'> <img id="logo-img" src={require("./official-assets/final_logo.png")} alt="logo"/> </Link>
            </div>

        </div>
        {/*right-side nav*/}
        <div class="right-nav-sec">
            <div>
                <Link className="quiz-cta-btn" to="/Quiz"> Take the quiz </Link>
            </div>
            <div>
                {!user && (<span onClick={() => setButtonPopup(true)} className="quiz-cta-btn" to="/Login"> Login </span>)}   
            </div>
            {/*Button for accessing account history. It should only work when logged in (user not equal to null)*/}
            <div>
                {user && (<Link className="quiz-cta-btn" to="/AccountHistory">My Account</Link>)}
            </div>
            {/*Logout button. This used to be on the app.js page*/}
            <div>
                {user && (
                <Logout />
                
                )}
            </div>
            {/* <div>
                <Link className="quiz-cta-btn" to="/Logout"> Logout </Link>
            </div> */}
        </div>
    </div>
        {/*Popup for user login*/}
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                    <h1 className="login-title">Login</h1>
                    <button className="login-button" onClick={handleGoogleLogin}>
                        Login with Google
                    </button>
        </Popup>

    {/*Hero section*/}
    <section class="hero-sec">
        {/*left side of hero section*/}
        <div class="l-hero-sec">
            <div class="l-hero-sec-top">
                <h1>
                    Discover a Healthier,<br/> <span> Better You.</span>
                </h1>

                <p>
                    Better Health is your personalized meal planning solution, designed to make healthy eating
                    easier
                    and more convenient for you. Take our quiz and create a free 5-day personalized meal plan today!
                </p>

                <div className='hero-button'><Link to="/Quiz" class="hero-cta-btn"> Take the quiz </Link></div>
            </div>
            <div class="hero-trustmarks">
                <span>
                    <p class="trust-h"> 30k</p>
                    <p class="trust-p"> 30 Thousand Recipes </p>
                </span>
                <span>
                    <p class="trust-h"> 10k</p>
                    <p class="trust-p"> Better Health Users </p>
                </span>
                <span>
                    <p class="trust-h"> 4.5+</p>
                    <p class="trust-p"> Star Rating </p>
                </span>
            </div>
        </div>

        {/*right side of hero section*/}
        <div class="r-hero-sec">
            <img src={require("./official-assets/hero-img.png")} alt="healthy salad"/>
        </div>
    </section>

    <div class="main-content">

        {/*How it works section*/}
        <section class="HiW-content">

            <h2> How it works </h2>

            <div class="HiW-sec">
                {/*}
                How it works section is divided into 3 sections by HiW-sec-div.
                Each div contains the following:  
                graphic img: HiW-sec-img 
                title heading: HiW-sec-H
                description: HiW-sec-p
                */}
                <div class="HiW-sec-div">
                    <div class="HiW-sec-img">
                        <img src={require("./official-assets/HiW-img-1.png")} alt="food smiley face"/>
                    </div>
                    <h3 class="HiW-sec-H">
                        Tell us about yourself
                    </h3>
                    <p class="HiW-sec-p">
                        Take the quiz and tell us about your unique health goals,
                        diet, and preferences.
                    </p>
                </div>

                <div class="HiW-sec-div">
                    <div class="HiW-sec-img">
                        <img src={require("./official-assets/HiW-img-2.png")} alt="healthy meal prep"/>
                    </div>
                    <h3 class="HiW-sec-H">
                        Get your personalized plan
                    </h3>
                    <p class="HiW-sec-p">
                        Based on your quiz results, receive a
                        customized meal plan tailored to your needs.
                    </p>
                </div>

                <div class="HiW-sec-div">
                    <div class="HiW-sec-img">
                        <img src={require("./official-assets/HiW-img-3.png")} alt="woman cooking"/>
                    </div>
                    <h3 class="HiW-sec-H">
                        Enjoy your new healthy meals
                    </h3>
                    <p class="HiW-sec-p">
                        Use the meal plan to shop for ingredients, follow easy recipes, and enjoy nutritious and
                        delicious meals every day.
                    </p>
                </div>
            </div>

        </section>

        {/*Benefits Section*/}
        <section class="B-sec">

            {/*} section 2: meal planning benefits
        icon: B-icon
        title: B-H
        paragraph: B-p
            */}
            <div class="B-sec-left">

                <img src={require("./official-assets/B-image.png")} alt=""/>
            </div>

            <div class="B-sec-right">
                <div>
                    <h2>
                        What can meal planning do for you?
                    </h2>
                </div>
                <div class="B-sec-main-content">
                    <div class="B-div">

                        <img src={require("./official-assets/icons/dollar-square.png")} alt=""/>

                        <h3> Save money on food</h3>
                        <p>With a personalized meal plan, you'll only buy what you need for the week,
                            reducing
                            your food expenses and saving you money.</p>
                    </div>

                    <div class="B-div">

                        <img src={require("./official-assets/icons/calendar.png")} alt=""/>

                        <h3>Save time planning</h3>
                        <p>Spend less time searching for recipes and creating meal plans, and more time
                            enjoying
                            healthy and delicious meals.</p>
                    </div>

                    <div class="B-div">

                        <img src={require("./official-assets/icons/happyemoji.png")} alt=""/>

                        <h3>Reduce food waste</h3>
                        <p>Say goodbye to forgotten leftovers and expired ingredients. Your customized
                            meal
                            plan
                            helps ensure you use everything you buy, reducing food waste and saving you money.</p>
                    </div>

                    <div class="B-div">

                        <img src={require("./official-assets/icons/medal.png")} alt=""/>

                        <h3>Achieve your health goals</h3>
                        <p>Whether you're looking to lose weight, build muscle, or simply eat healthier,
                            your
                            personalized meal plan will help you achieve your health and wellness goals.</p>
                    </div>

                </div>
            </div>

        </section>

        {/* Testimonial section, images will be used instead of docu*/}
        <section class="review-sec">

            <div class="review-sec-top">
                <div class="review-sec-top-l">
                    <h2> What are people saying</h2>
                    <p> People are raving about their personalized meal plans and delicious recipes.</p>
                </div>
                <div class="review-sec-top-r">
                    <div>
                        <img src={require("./official-assets/review-img.png")} alt=""/>
                    </div>
                    <div class="review-sec-top-r-text">
                        <h4>1000+ Reviews</h4>
                        <p>Over a thousand happy users rated Better Health.</p>
                    </div>
                </div>
            </div>
            <div class="review-sec-bottom">
                <img src={require("./official-assets/reviews/Group 28.png")} alt=""/>

                <img src={require("./official-assets/reviews/Group 29.png")} alt=""/>

                <img src={require("./official-assets/reviews/Group 30.png")} alt=""/>
            </div>
        </section>

        {/* call to action section bottom of page*/}
        <section class="cta-bottom">
            <img src={require("./official-assets/lower-cta-img.png")} alt=""/>
            <div class="cta-content">
                <h2>Embrace a healthier lifestyle and discover your perfect plate!</h2>
                <p>Let's start your journey to a happier and more nutritious you now.</p>
                <Link class="quiz-cta-btn" to="/Quiz"> Take the quiz </Link>
            </div>
        </section>
        {/*Calorie Counter/*/}
        <div class="CalorieCounter">
            <h2>Calorie Counter</h2>
            <p>Effortlessly track your daily calorie intake and achieve your health goals with our accurate and
                user-friendly calorie counter tool. </p>

            <div class="calorie-calc-form">

                    <div class="meal-input-section">
                        <label for="meal-item">Meal:</label>
                        <input type="text" id="meal-item" name="meal-item" placeholder="Add meal item"/>
                        <label for="calories">Calories:</label>
                        <input type="number" id="calories" name="calories"/> <br/>
                        <button id="add-meal-item" onClick={() => 
                        addMealItem(document.getElementById("meal-item").value, document.getElementById("calories").value)}>Add Meal</button>
                    </div>
                    <div>
                        <label for="intake-item">Intake Item:</label>
                        <select id="intake-item">
                            {mealItems.map((mealItems, index) => {
                                return (
                                    <option key={index} value={index}>{mealItems.mealName}</option> 
                                )
                            })}
                        </select>

                        <label for="quantity">Quantity:</label>
                        <input type="number" id="quantity" name="quantity"/>
                        <br/>
                        <button id="add-to-intake" 
                        onClick={() => handleCal(document.getElementById("intake-item").value, 
                        document.getElementById("quantity").value, "Add")}
                        > Add meal to intake </button>
                        <button id="remove-from-intake"
                        onClick={() => handleCal(document.getElementById("intake-item").value,
                        document.getElementById("quantity").value, "Remove")}
                        > Remove meal from intake</button>
                    </div>

                    <div class="total-cal">
                        <div>Total Calories: {totalCal}</div>
                    </div>

            </div>
        </div>

        {/*FAQ section of webpage. Implement javascript to reveal faq*/}
        <section class="faq-section">

            <h2> 
                Frequently Asked <br/>Questions
            </h2>

            <div class="faq-container">
                <div class="faq-item">
                    <div class="faq-question">
                        <span className='faq-arrow' onClick={() => handleArr(0)}><FontAwesomeIcon icon={open[0] ? faChevronRight : faChevronDown} /></span>
                        <h3>What makes better health different from others?</h3>
                    </div>
                    <div className={`faq-answer ${open[0] ? 'inactive' : 'active'}`}>
                        <p>Our app creates personalized meal plans based on your specific dietary restrictions, health
                            goals, and taste preferences, ensuring you get a plan that fits your needs and preferences.
                        </p>
                    </div>
                </div>
                <div class="faq-item">
                    <div class="faq-question">
                        <span className='faq-arrow' onClick={() => handleArr(1)}><FontAwesomeIcon icon={open[1] ? faChevronRight : faChevronDown} /></span>
                        <h3>How does the quiz work? </h3>
                    </div>
                    <div className={`faq-answer ${open[1] ? 'inactive' : 'active'}`}>
                        <p>
                            The quiz consists of a series of questions about your diet, health goals, and tastes. The
                            answers you provide help us create a customized meal plan tailored to your specific needs.
                        </p>
                    </div>
                </div>
                <div class="faq-item">
                    <div class="faq-question">
                        <span className='faq-arrow' onClick={() => handleArr(2)}><FontAwesomeIcon icon={open[2] ? faChevronRight : faChevronDown} /></span>
                        <h3>Is there a limit to the number of meal plans that I can create? </h3>
                    </div>
                    <div className={`faq-answer ${open[2] ? 'inactive' : 'active'}`}>
                        <p>No, there is no limit. You can take the quiz as many times as you like and create new meal
                            plans to suit your changing needs and preferences.</p>
                    </div>
                </div>
                <div class="faq-item">
                    <div class="faq-question">
                        <span className='faq-arrow' onClick={() => handleArr(3)}><FontAwesomeIcon icon={open[3] ? faChevronRight : faChevronDown} /></span>
                        <h3>What diets are supported?</h3>
                    </div>
                    <div className={`faq-answer ${open[3] ? 'inactive' : 'active'}`}>
                        <p>We support the following diets:
                        <ul>
                            <li>Pescatarian</li>
                            <li>Vegan</li>
                            <li>Ketogenic</li>
                            <li>Paleolithic</li>
                            <li>Vegetarian (lacto and ovo)</li>
                            <li>Standard</li>
                        </ul>
                        </p>
                    </div>
                </div>
                <div class="faq-item">
                    <div class="faq-question">
                        <span className='faq-arrow' onClick={() => handleArr(4)}><FontAwesomeIcon icon={open[4] ? faChevronRight : faChevronDown} /></span>
                        <h3>What kind of recipes are included in the meal plan?</h3>
                    </div>
                    <div class={`faq-answer ${open[4] ? 'inactive' : 'active'}`}>
                        <p>All of our recipes are designed to be healthy, nutritious, and delicious. They're also easy
                            to prepare and follow, making meal prep a breeze.</p>
                    </div>
                </div>
                <div class="faq-item">
                    <div class="faq-question">
                        <span className='faq-arrow' onClick={() => handleArr(5)}><FontAwesomeIcon icon={open[5] ? faChevronRight : faChevronDown} /></span>
                        <h3>Is there support available if I have questions or need help with my meal plan?</h3>
                    </div>
                    <div class={`faq-answer ${open[5] ? 'inactive' : 'active'}`}>
                        <p>Yes, our customer support team is available to answer any questions you may have and provide
                            assistance with your meal plan.
                        </p>
                        <p>Contact us at <a href="mailto:Hello@betterhealth.com">Hello@betterhealth.com</a> </p>
                    </div>
                </div>
            </div>
        </section>

        </div>
        <footer>
            <div class="footer-contents">
                <div class="newsletter-form">
                    <h3>Subscribe to our newsletter and receive free recipes, health tips, and more.</h3>
                    <form>
                        <input type="email" placeholder="Enter your email here" required/>
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
                <div class="bottom-nav-links">

                </div>
                <div class="footer-contact">
                    <p>Got a question? <br/> Contact us.</p>
                    <a href="mailto:#">Hello@betterhealth.com</a>
                </div>
                <div class="copyright">
                    <p> © Copyright 2023 Sonia Khan, Brianna Knight, Clea Lacks, Sahib Othi, Austin Roy-Stewart, Allen Kagle</p>
                </div>
            </div>

        </footer>
        </body>
    </div>
    )
}

export default Home;
           
