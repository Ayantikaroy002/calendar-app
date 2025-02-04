import React, {
    useState,
    useEffect,
    useReducer,
    useMemo,
  } from "react";
  import GlobalContext from "./GlobalContext";
  import dayjs from "dayjs";
  
  function savedEventsReducer(state, { type, payload }) {
    switch (type) {
      case "push":
        return [...state, payload];
      case "update":
        return state.map((evt) =>
          evt.id === payload.id ? payload : evt
        );
      case "delete":
        return state.filter((evt) => evt.id !== payload.id);
      default:
        throw new Error();
    }
  }
  function initEvents() {
    const storageEvents = localStorage.getItem("savedEvents");
    const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
    return parsedEvents;
  }
  
  export default function ContextWrapper(props) {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [filterKeyword, setFilterKeyword] = useState("");
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
    const [daySelected, setDaySelected] = useState(dayjs());
    const [showEventModal, setShowEventModal] = useState(false);
    const [showTask, setShowTask] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [labels, setLabels] = useState([]);
    const [savedEvents, dispatchCalEvent] = useReducer(
      savedEventsReducer,
      [],
      initEvents
    );
  
    const filteredEvents = useMemo(() => {
        return savedEvents.filter((evt) => {
          
          const activeLabels = labels.filter((lbl) => lbl.checked).map((lbl) => lbl.label);
          
          const labelMatch = activeLabels.length === 0 || activeLabels.includes(evt.label);
      
          const keywordMatch =
            evt.title.toLowerCase().includes(filterKeyword.toLowerCase()) ||
            evt.description?.toLowerCase().includes(filterKeyword.toLowerCase());
      
          return labelMatch && keywordMatch;
        });
      }, [savedEvents, labels, filterKeyword]);

      
      
      
  
    useEffect(() => {
      localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
    }, [savedEvents]);

  
    useEffect(() => {
      if (smallCalendarMonth !== null) {
        setMonthIndex(smallCalendarMonth);
      }
    }, [smallCalendarMonth]);
  
    useEffect(() => {
      if (!showEventModal) {
        setSelectedEvent(null);
      }
    }, [showEventModal]);
  
  
    useEffect(() => {
        setLabels((prevLabels) => {
          return [...new Set(savedEvents.map((evt) => evt.label))].map((label) => {
            const currentLabel = prevLabels.find((lbl) => lbl.label === label);
            return {
              label,
              checked: currentLabel ? currentLabel.checked : true,
              color: currentLabel ? currentLabel.color : "gray",
            };
          });
        });
      }, [savedEvents]);
      

      function updateLabel(label) {
        setLabels(
          labels.map((lbl) =>
            lbl.label === label.label ? { ...lbl, ...label } : lbl
          )
        );
      }
      
  
    return (
      <GlobalContext.Provider
        value={{
          monthIndex,
          setMonthIndex,
          filterKeyword,         
          setFilterKeyword,
          smallCalendarMonth,
          setSmallCalendarMonth,
          daySelected,
          setDaySelected,
          showEventModal,
          setShowEventModal,
          showTask,
          setShowTask,
          dispatchCalEvent,
          selectedEvent,
          setSelectedEvent,
          savedEvents,
          setLabels,
          labels,
          updateLabel,
          filteredEvents,
        }}
      >
        {props.children}
      </GlobalContext.Provider>
    );
  }