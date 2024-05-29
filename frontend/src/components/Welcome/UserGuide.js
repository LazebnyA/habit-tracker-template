import React, {useState} from 'react';
import './UserGuide.css';
import createGoalGif from './gifs/create-goal.gif';
import deleteGoalGif from './gifs/delete-goal.gif';
import editHabitGif from './gifs/update-goal.gif';
import createHabitGif from './gifs/create-habit.gif';
import deleteHabitGif from './gifs/delete-habit.gif';
import updateHabitGif from './gifs/update-habit.gif';
import trackHabit from './gifs/track-habit.gif';
import checkProgress from './gifs/check-progress.gif';
import setWeather from './gifs/set-weather.gif';
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
                            <button className={"additionGuide"}
                                    onClick={() => setshowAdditionalGoalsGuide(!showAdditionalGoalsGuide)}>
                                {showAdditionalGoalsGuide ? 'Hide Additional Guides' : 'Show Additional Guides (How to delete/redact goals)'}
                            </button>
                        </div>
                        {showAdditionalGoalsGuide && (
                            <>
                                <div className="guideItem">
                                    <div className="guideText">
                                        <h2>How to Delete a Goal</h2>
                                        <p>Just click the trash bin icon located next to the goal name and confirm
                                            deletion.</p>
                                    </div>
                                    <div className="guideGif">
                                        <img src={deleteGoalGif} alt="How to Delete a Goal"/>
                                    </div>
                                </div>

                                <div className="guideItem">
                                    <div className="guideText">
                                        <h2>How to Edit a Goal</h2>
                                        <p>Click the pencil icon next to the goal and enter your new goal name. Then,
                                            confirm the update.</p>
                                    </div>
                                    <div className="guideGif">
                                        <img src={editHabitGif} alt="How to Edit a Goal"/>
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
                            <button className={"additionGuide"}
                                    onClick={() => setshowAdditionalHabitsGuide(!showAdditionalHabitsGuide)}>
                                {showAdditionalHabitsGuide ? 'Hide Additional Guides' : 'Show Additional Guides (How to delete/redact habits)'}
                            </button>
                        </div>
                        {showAdditionalHabitsGuide && (
                            <>
                                <div className="guideItem">
                                    <div className="guideText">
                                        <h2>How to Delete a Habit</h2>
                                        <p>Just click the trash bin icon located next to the goal name and confirm
                                            deletion.</p>
                                    </div>
                                    <div className="guideGif">
                                        <img src={deleteHabitGif} alt="How to Delete a Habit"/>
                                    </div>
                                </div>

                                <div className="guideItem">
                                    <div className="guideText">
                                        <h2>How to Edit a Habit</h2>
                                        <p>Click the pencil icon next to the goal and enter your new goal name. Then,
                                            confirm the update.</p>
                                    </div>
                                    <div className="guideGif">
                                        <img src={updateHabitGif} alt="How to Edit a Habit"/>
                                    </div>
                                </div>
                            </>
                        )}
                        <div className="guideItem">
                            <div className="guideText">
                                <h2>How to Track a Habit</h2>
                                <p>To track a habit, check the box next to the habit name on the main screen. This marks
                                    the habit as completed for the day.</p>
                            </div>
                            <div className="guideGif">
                                <img src={trackHabit} alt="How to Track a Habit"/>
                            </div>
                        </div>
                        <div className="guideItem">
                            <div className="guideText">
                                <h2>How to Check a Habit using the Calendar</h2>
                                <p>To check a habit using the calendar, click on the calendar icon next to the habit.
                                    This allows you to see your progress over time.</p>
                            </div>
                            <div className="guideGif">
                                <img src={checkProgress} alt="How to Check a Habit using the Calendar"/>
                            </div>
                        </div>
                        <div className="guideItem">
                            <div className="guideText">
                                <h2>How to set location and see weather information</h2>
                                <p>Type your city name in the input bar. Then, click the submit button. If nothing happens, it could mean either your city/town is not in the weather database or you misspelled it.</p>
                            </div>
                            <div className="guideGif">
                                <img src={setWeather} alt="How to set location and see weather info"/>
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