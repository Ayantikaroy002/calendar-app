import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";


export default function Task() {
  const {
    setShowTask,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
  } = useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
 

  // New state to control edit mode
  const [isEditing, setIsEditing] = useState(!selectedEvent);

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowTask(false);
  }

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <form className="bg-white rounded-xl shadow-2xl w-96" onSubmit={handleSubmit}>
        
        <header className="bg-blue-500 px-5 py-3 rounded-t-xl flex justify-between items-center">
          <h2 className="text-white font-semibold text-lg">Task</h2>
          <div className="space-x-3">
            
            {selectedEvent && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="text-white hover:text-gray-300 transition"
              >
                <i className="pi pi-pencil text-lg"></i>
              </button>
            )}
            {selectedEvent && (
              <button
                type="button"
                onClick={() => {
                  dispatchCalEvent({ type: "delete", payload: selectedEvent });
                  setShowTask(false);
                }}
                className="text-white hover:text-red-400 transition"
              >
                <i className="pi pi-trash text-lg"></i>
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowTask(false)}
              className="text-white hover:text-gray-300 transition"
            >
              <i className="pi pi-times text-lg"></i>
            </button>
          </div>
        </header>

        <div className="p-5 space-y-6">
        
          <div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              readOnly={!isEditing}
              required
              className={`w-full px-3 py-2 border-b-2 ${
                isEditing ? "border-gray-200 focus:outline-none focus:border-blue-500" : "border-gray-300 bg-gray-100"
              } text-gray-700 text-lg`}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-3">
            <span className="material-icons-outlined text-gray-500">schedule</span>
            <p className="text-gray-700 font-medium">
              {daySelected.format("dddd, MMMM DD")}
            </p>
          </div>
          <div>
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              readOnly={!isEditing}
              required
              className={`w-full px-3 py-2 border-b-2 ${
                isEditing ? "border-gray-200 focus:outline-none focus:border-blue-500" : "border-gray-300 bg-gray-100"
              } text-gray-700`}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-3">
            <span className="material-icons-outlined text-gray-500">
              event_color
            </span>
            <div className="flex gap-2">
           
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-4 bg-gray-50 rounded-b-xl">
          {isEditing && (
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition"
            >
              Save
            </button>
          )}
        </footer>
      </form>
    </div>
  );
}
