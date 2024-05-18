import React from 'react';
import { Link } from 'react-router-dom';
import './News.css';

const News = () => {
    const newsItems = [
        {
            title: "Version 1.1 Released",
            date: "May 20, 2024",
            content: "We are excited to announce the release of Evolve version 1.1. This update includes new features like customizable habit reminders, improved analytics, and a refreshed user interface to help you stay on track with your goals."
        },
        {
            title: "Introducing Dark Mode",
            date: "April 10, 2024",
            content: "By popular demand, Evolve now supports Dark Mode! Easily switch between light and dark themes to reduce eye strain and save battery life on your devices."
        },
        {
            title: "Enhanced Habit Tracking",
            date: "March 15, 2024",
            content: "Our latest update brings enhanced habit tracking capabilities, including detailed progress reports and habit streaks. Keep your momentum going and see how small changes add up over time."
        }
    ];

    return (
        <>
            <nav id="newsNav">
                <div className="navContainer">
                    <h1>Evolve</h1>
                    <ul>
                        <li><Link className="navButton" to="/">Home</Link></li>
                        <li><Link className="navButton" to="/Signin">Login</Link></li>
                        <li><Link className="navButton" to="/Register">Register</Link></li>
                    </ul>
                </div>
            </nav>

            <header id="newsHeader">
                <div className="newsContainer">
                    <div className="newsHeading">
                        <h1>What's New</h1>
                        <p>Stay updated with the latest news and release notes from Evolve.</p>
                    </div>
                </div>
            </header>

            <main>
                <section className="news">
                    <div className="newsContainer">
                        {newsItems.map((item, index) => (
                            <div className="newsItem" key={index}>
                                <h2>{item.title}</h2>
                                <p className="date">{item.date}</p>
                                <p>{item.content}</p>
                            </div>
                        ))}
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

export default News;