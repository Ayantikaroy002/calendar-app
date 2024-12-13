import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { getMonth } from "./util";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import Task from "./components/Task";
import EventList from "./components/EventList";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Import Router components
import Event from "./components/Event";

function App() {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal, showTask, filterKeyword } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <Router>
      <React.Fragment>
        {showEventModal && <Event />}
        {showTask && <Task />}

        <div className="h-screen flex flex-col">
          <CalendarHeader />
          <div className="flex flex-1 bg-slate-100">
            <Sidebar />
            {/* Define Routes for Calendar and Task Page */}
            <Routes>
              <Route path="/" element={filterKeyword ? <EventList /> : <Month month={currenMonth} />} />
              <Route path="/tasks" element={<Task />} />
            </Routes>
          </div>
        </div>
      </React.Fragment>
    </Router>
  );
}

export default App;
