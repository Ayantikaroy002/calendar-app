import React, { useState } from "react";
import SmallCalendar from "./SmallCalendar";
import Labels from "./Labels";
import CreateButton from "./CreateButton";

export default function Sidebar() {
  const [showCalendars, setShowCalendars] = useState(true);

  return (
    <aside className="p-5 w-64">
      <CreateButton />
      <SmallCalendar />
       
      <div className="mt-5">
        
        <div
          className="flex items-center cursor-pointer mb-2"
          onClick={() => setShowCalendars(!showCalendars)}
        >
          <h2 className="font-bold ml-2">My calendars</h2>
          <span className={`ml-auto transform ${showCalendars ? "rotate-0" : "-rotate-180"}`}>
            ▲
          </span>
        </div>

        
        {showCalendars && (
          <Labels/>
          
        )}
      </div>
    </aside>
  );
}
