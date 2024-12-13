import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple", "flamingo", "orange", "sage", "lavender"];

export default function Event() {
  const {
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
  } = useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(selectedEvent ? selectedEvent.description : "");
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent ? labelsClasses.find((lbl) => lbl === selectedEvent.label) : labelsClasses[0]
  );

  // New state for edit mode
  const [isEditing, setIsEditing] = useState(!selectedEvent);

  // New state for showing time inputs
  const [showTimeInputs, setShowTimeInputs] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState(""); // TODO: make times globally available

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      startTime,
      endTime,
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false);
  }

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <form className="bg-white rounded-xl shadow-2xl w-96" onSubmit={handleSubmit}>
      
        <header className="bg-blue-500 px-5 py-3 rounded-t-xl flex justify-between items-center">
          <h2 className="text-white font-semibold text-lg">Event</h2>
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
                  setShowEventModal(false);
                }}
                className="text-white hover:text-red-400 transition"
              >
                <i className="pi pi-trash text-lg"></i>
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowEventModal(false)}
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
                isEditing ? "border-gray-200 focus:outline-none " : "border-gray-300 bg-gray-100"
              } text-gray-700 text-lg`}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {showTimeInputs ? "":
          <div className="flex items-center space-x-3">
             <span className="material-icons-outlined text-gray-500">schedule</span>
    <p className="text-gray-700 font-medium">
      {daySelected.format("dddd, MMMM DD")}
    </p>
    {!showTimeInputs && (
      <button
        type="button"
        className="border border-stone-500 rounded-full py-1 px-4 text-gray-600 hover:bg-gray-200 transition"
        onClick={() => setShowTimeInputs(!showTimeInputs)}
      >
        Add time
      </button>)}
          </div>}

          {showTimeInputs && (
            <div className="flex flex-col space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Start Time</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">End Time</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
                 <p className="text-gray-700 font-medium">
              {daySelected.format("dddd, MMMM DD")}
            </p>
              </div>
            </div>
          )}

          <div>
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              readOnly={!isEditing}
              required
              className={`w-full px-3 py-2 border-b-2 ${
                isEditing ? "border-gray-200 focus:outline-none " : "border-gray-300 bg-gray-100"
              } text-gray-700`}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-3">
            <span className="material-icons-outlined text-gray-500">event_color</span>
            <div className="flex gap-2">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => isEditing && setSelectedLabel(lblClass)}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full cursor-pointer hover:opacity-80 transition flex items-center justify-center ${
                    !isEditing ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {selectedLabel === lblClass && (
                    <i className="pi pi-check" style={{ fontSize: "0.8rem", color: "white" }}></i>
                  )}
                </span>
              ))}
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
