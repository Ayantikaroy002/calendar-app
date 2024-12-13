import dayjs from "dayjs";
import React, { useContext } from "react";
import logo from "../assets/logo.png";
import GlobalContext from "../context/GlobalContext";
import 'primeicons/primeicons.css';
import { useNavigate } from 'react-router-dom'; 

export default function CalendarHeader() {
  const { monthIndex, setMonthIndex, filterKeyword, setFilterKeyword } = useContext(GlobalContext);
  const navigate = useNavigate(); 

  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }

  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }

  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }

  function handleGoToTasks() {
    navigate('/tasks'); 
  }

  return (
    <header className="px-4 pt-2 flex items-center bg-slate-100 justify-between">
      <div className="flex items-center ml-3">
        <i className="pi pi-bars" style={{ fontSize: '1.2rem' }}></i>
        <img src={logo} alt="calendar" className="mr-2 ml-5 w-8 h-8" />
        <h1 className="mr-10 text-3xl font-bold">Calendar</h1>
        <button
          onClick={handleReset}
          className="border border-stone-500 rounded-full py-2 px-6 mr-5 ml-10"
        >
          Today
        </button>
        <button onClick={handlePrevMonth}>
          <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
            <i className="pi pi-chevron-left" style={{ fontSize: '1rem' }}></i>
          </span>
        </button>
        <button onClick={handleNextMonth}>
          <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
            <i className="pi pi-chevron-right" style={{ fontSize: '1rem' }}></i>
          </span>
        </button>
        <h2 className="ml-4 text-2xl text-gray-500 font-bold">
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </h2>
      </div>

      <div className="flex items-center space-x-5 mr-5">
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search events..."
            value={filterKeyword}
            onChange={(e) => setFilterKeyword(e.target.value)} 
            className="py-2 px-4 border rounded-full focus:outline-none focus:border-blue-500"
          />
          <i className="pi pi-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
        </div>

        <i className="pi pi-cog" style={{ fontSize: '1.2rem' }}></i>
        <i className="pi pi-question-circle" style={{ fontSize: '1.2rem' }}></i>

        <button className="border border-stone-500 rounded-full py-2 px-6">
          Month
          <i className="pi pi-sort-down" style={{ fontSize: "0.5rem", paddingLeft: 10 }}></i>
        </button>

        <div className="inline-flex border border-stone-500 rounded-full overflow-hidden">
          <button className="py-2 px-4 hover:bg-blue-200 transition-colors flex items-center justify-center">
            <i className="pi pi-calendar text-gray-700" style={{ fontSize: '1.2rem' }}></i>
          </button>
          <div className="w-px bg-gray-400"></div>
          <button
            onClick={handleGoToTasks} 
            className="py-2 px-4 hover:bg-blue-200 transition-colors flex items-center justify-center"
          >
            <i className="pi pi-check-circle text-gray-700" style={{ fontSize: '1.2rem' }}></i>
          </button>
        </div>
      </div>
    </header>
  );
}
