import './Welcome.css';
import {Link} from "react-router-dom";
import React from "react";

const Welcome = () => {
    return (
        <>
            <nav id="welcomeNav">
                <div className="navContainer">
                    <h1>Evolve</h1>
                    <ul>
                        <li><Link className="navButton" to="/news">News</Link></li>
                        <li><Link className="navButton" to="/Signin">Login</Link></li>
                        <li><Link className="navButton" to="/Register">Register</Link></li>
                    </ul>
                </div>
            </nav>


            <header id="welcomeHeader">
                <div className="container">
                    <div className="heading">
                        <h1>Evolve</h1>
                        <p>Habit Tracker to Help You Succeed</p>
                    </div>
                    <div className="ellipse">
                        <div className="ellipse1"></div>
                        <div className="ellipse2"></div>
                        <div className="ellipse3"></div>
                    </div>
                </div>
            </header>

            <main>
                <section className="welcome">
                    <div className="container">
                        <div className="hero-text">
                            <h2>Welcome</h2>
                            <p>Where ordinary people transform into remarkable personalities; welcome the habit tracker, your unnoticed partner you never realized necessary but can't operate without.</p>
                            <Link className={"navButton"} to={"/Register"}>Sign-up for free</Link>
                        </div>
                        <div className="heroDecoration">
                            <div className="item1"></div>
                            <div className="item2"></div>
                            <div className="item3"></div>
                            <div className="item4"></div>
                            <div className="item5"></div>
                            <div className="item6"></div>
                        </div>
                    </div>
                </section>

                <section className="features">
                    <div className="container featuresContainer">
                        <div className="featureItem feature1">
                            <div className="featureText">
                                <h3 className="featureHeading">
                                    Craft Goals, Build Habits, Forge Your Future
                                </h3>
                                <p className="featureParagraph">
                                    This instrument helps you maintain consistency in your habits and supports your
                                    growth
                                    as you progress.
                                </p>
                            </div>
                            <div className="featureDecoration featureDecorItem1">

                            </div>
                        </div>
                        <div className="featureItem feature2">
                            <div className="featureDecoration featureDecorItem2">

                            </div>
                            <div className="featureText">
                                <h3 className="featureHeading">
                                    Revolutionizing Life one Habit at a Time
                                </h3>
                                <p className="featureParagraph">
                                    You can draw your path to success with broad strokes of desire, but it’s the little habits that paint the intricate details.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="guide">
                    <div className="container">
                        <h2>Get Started with Evolve</h2>
                        <p>Follow these simple steps to kickstart your journey with Evolve:</p>
                        <ol>
                            <li><strong>Sign Up:</strong> Create your Evolve account by registering for free.</li>
                            <li><strong>Set Goals:</strong> Define your goals and aspirations you want to achieve.</li>
                            <li><strong>Build Habits:</strong> Start building habits aligned with your goals.</li>
                            <li><strong>Track Progress:</strong> Monitor your progress using Evolve's intuitive tracking
                                system.
                            </li>
                            <li><strong>Stay Consistent:</strong> Consistency is key. Stick to your habits and watch
                                yourself evolve.
                            </li>
                        </ol>
                        <p>You can find a more detailed guide for using the application <Link
                            to="/UserGuide">here</Link>.</p>
                        <Link className="navButton" to="/Register">Get Started</Link>
                    </div>
                </section>
            </main>

            <footer>
                <div className="container">
                <p>&copy; 2024 Evolve</p>
                </div>
            </footer>
        </>
    )
}

export default Welcome;