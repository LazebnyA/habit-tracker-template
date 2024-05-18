import React, { useState } from 'react';
import './styles/Calendar.css'

const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const generateDaysArray = (year, month) => {
  const daysInMonth = getDaysInMonth(year, month);
  const daysArray = [];
  for (let day = 1; day <= daysInMonth; day++) {
    daysArray.push(new Date(Date.UTC(year, month, day)));
  }
  return daysArray;
};

const HabitCalendar = ({ trackedDates }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentDate(prevDate => {
      return new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
    });
  };

  const handleNextMonth = () => {
    setCurrentDate(prevDate => {
      return new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
    });
  };

  const daysArray = generateDaysArray(currentDate.getFullYear(), currentDate.getMonth());

  return (
    <div className="calendar">
      <div className="calendar-header">
        <h2>{currentDate.toLocaleString('en-US', {month: 'long', year: 'numeric'})}</h2>
        <div className="calendarNav">
          <button onClick={handlePrevMonth}>Previous Month</button>
          <button onClick={handleNextMonth}>Next Month</button>
        </div>
      </div>
      <div className="calendar-grid">
        {daysArray.map((date, index) => (
            <div
            key={index}
            className={`calendar-day ${
              trackedDates.includes(date.toISOString().split('T')[0]) ? 'tracked' : ''
            }`}
          >
            {date.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitCalendar;