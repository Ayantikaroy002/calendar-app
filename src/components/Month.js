import React from "react";
import Day from "./Day";
export default function Month({ month }) {
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5 rounded-3xl bg-white overflow-hidden mx-4 mt-2 mb-4">
    {month.map((row, i) => (
      <React.Fragment key={i}>
        {row.map((day, idx) => (
          <Day day={day} key={idx} rowIdx={i} />
        ))}
      </React.Fragment>
    ))}
  </div>
  
  );
}