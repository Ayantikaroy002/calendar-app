import React, { useState, useRef, useEffect, useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function CreateButton() {
  const { setShowEventModal } = useContext(GlobalContext);
  const { setShowTask } = useContext(GlobalContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const buttonRef = useRef(null); 
  const dropdownRef = useRef(null); 

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  useEffect(() => {
    const positionDropdown = () => {
      if (buttonRef.current && dropdownRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
      }
    };

    if (showDropdown) {
      positionDropdown();
    }

    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [showDropdown]);

  return (
    <div className="relative">
      
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="bg-white border py-3 px-4 rounded-2xl flex items-center shadow-md hover:shadow-2xl"
      >
        <i className="pi pi-plus" style={{ fontSize: "1rem",}}></i>
        <span className="px-3 "> Create</span>
        <i className="pi pi-sort-down-fill" style={{ fontSize: "0.5rem",}}></i>
      </button>

      
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute w-48 mt-2 bg-slate-200 shadow-xl rounded-md z-10 py-2 elevation-lg"
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="px-4 py-2 hover:bg-gray-300 cursor-pointer" onClick={() => setShowEventModal(true)}>
            Event
          </div>
          <div className="px-4 py-2 hover:bg-gray-300 cursor-pointer" onClick={() => setShowTask(true)}>
            Task
          </div>
          <div className="px-4 py-2 hover:bg-gray-300 cursor-pointer">
            Appointment schedule
          </div>
        </div>
      )}
    </div>
  );
}
