import React, {useState} from 'react';
import './UserGuide.css';
import createGoalGif from './gifs/create-goal.gif';
import createHabitGif from './gifs/create-habit.gif';
import {Link} from "react-router-dom";

const UserGuide = () => {
    const [showAdditionalGoalsGuide, setshowAdditionalGoalsGuide] = useState(false);
    const [showAdditionalHabitsGuide, setshowAdditionalHabitsGuide] = useState(false);

    return (
        <>
            <nav id="userGuideNav">
                <div className="navContainer">
                    <h1><Link to="/">Evolve</Link></h1>
                    <ul>
                        <li><Link className="navButton" to="/">Home</Link></li>
                        <li><Link className="navButton" to="/Signin">Login</Link></li>
                        <li><Link className="navButton" to="/Register">Register</Link></li>
                    </ul>
                </div>
            </nav>

            <header id="userGuideHeader">
                <div className="guideContainer">
                    <div className="guideHeading">
                        <h1>User Guide</h1>
                        <p>Learn how to make the most out of Evolve with these simple guides.</p>
                    </div>
                </div>
            </header>

            <main>
                <section className="guide">
                    <div className="guideContainer">
                        <div className="guideItem">
                            <div className="guideText">
                                <h2>How to Create a Goal</h2>
                                <p>To create a goal, click on the "+ ADD A GOAL" button on the left sidebar. Enter your
                                    goal details and save it.</p>
                            </div>
                            <div className="guideGif">
                                <img src={createGoalGif} alt="How to Create a Goal"/>
                            </div>
                            <button className={"additionGuide"} onClick={() => setshowAdditionalGoalsGuide(!showAdditionalGoalsGuide)}>
                                {showAdditionalGoalsGuide ? 'Hide Additional Guides' : 'Show Additional Guides (How to delete/redact goals)'}
                            </button>
                        </div>
                        {showAdditionalGoalsGuide && (
                            <>
                                {/* Component for How to Delete a Goal */}
                                <div className="guideItem">
                                <div className="guideText">
                                        <h2>How to Delete a Goal</h2>
                                        <p>Description of how to delete a goal...</p>
                                    </div>
                                    <div className="guideGif">
                                        <img src={""} alt="How to Delete a Goal"/>
                                    </div>
                                </div>

                                {/* Component for How to Edit a Goal */}
                                <div className="guideItem">
                                    <div className="guideText">
                                        <h2>How to Edit a Goal</h2>
                                        <p>Description of how to edit a goal...</p>
                                    </div>
                                    <div className="guideGif">
                                        <img src={""} alt="How to Edit a Goal"/>
                                    </div>
                                </div>
                            </>
                        )}
                        <div className="guideItem">
                            <div className="guideText">
                                <h2>How to Create a Habit</h2>
                                <p>To create a habit, click on the "+ ADD A HABIT" button on the right sidebar. Enter
                                    your habit details and save it.</p>
                            </div>
                            <div className="guideGif">
                                <img src={createHabitGif} alt="How to Create a Habit"/>
                            </div>
                        </div>
                        <div className="guideItem">
                            <div className="guideText">
                                <h2>How to Track a Habit</h2>
                                <p>To track a habit, check the box next to the habit name on the main screen. This marks
                                    the habit as completed for the day.</p>
                            </div>
                            <div className="guideGif">
                                <img src="path/to/track-habit.gif" alt="How to Track a Habit"/>
                            </div>
                        </div>
                        <div className="guideItem">
                            <div className="guideText">
                                <h2>How to Check a Habit using the Calendar</h2>
                                <p>To check a habit using the calendar, click on the calendar icon next to the habit.
                                    This allows you to see your progress over time.</p>
                            </div>
                            <div className="guideGif">
                                <img src="path/to/check-habit.gif" alt="How to Check a Habit using the Calendar"/>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer>
                <div className="container">
                    <p>&copy; 2024 Evolve</p>
                </div>
            </footer>
        </>
    );
};

export default UserGuide;