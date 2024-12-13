import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function TaskDisplay() {
  return (
    <div> 
          <div className="p-4">
      {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => (
          <div key={event.id} className="flex items-center border-b py-4">
            
            <div className="flex flex-row items-center mr-4">
              <div className="w-10 h-10 rounded-full border-2 border-blue-500 flex items-center justify-center text-lg font-bold">
                {dayjs(event.day).date()}
              </div>
              <div className="text-sm text-gray-500 ml-3">
                {dayjs(event.day).format("MMM YYYY, ddd")}
              </div>
            </div>

            <div className="flex ml-10">
              <div className="flex items-center">
               
                <span
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: event.label || "gray" }}
                ></span>
               
                <span className="text-gray-700">
                  {dayjs(event.day).format("h:mma")} –{" "}
                  {dayjs(event.day).add(1, "hour").format("h:mma")}
                </span>
              </div>
              <div className="flex flex-col ml-20"> 
              <h3 className="text-lg font-semibold"> Title: {event.title}</h3>
              <p className="text-gray-500"> Description: {event.description}</p> </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No events match your filters.</p>
      )}
    </div>
    </div>
  );
}