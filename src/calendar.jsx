import React, { useState } from "react";
import moment from "moment";
// uk is requared 
import uk from "../node_modules/moment/locale/uk";

import ListDays from "./list_days";

function Calendar({
  nowDate = new Date(),
  locale = 'uk',
  utcOffset = -180,
}) {
  const [selectedDate, setSelectedDate] = useState(moment(new Date()).format());
  const [calendarDate, setCalendarDate] = useState(moment(new Date()).format());

  if (!calendarDate || !nowDate) return null;
  
  const increaseCalendarDate = () => {
    const month = calendarDate.split("-")[1];

    setCalendarDate(moment(calendarDate).month(month).format());
  };

  const decreaseCalendarDate = () => {
    const month = calendarDate.split("-")[1];

    setCalendarDate(moment(calendarDate).month(Number(month) - 2).format());
  };

  const canScrollBack = moment(calendarDate).isAfter(nowDate, "month");

  return (
    <div id="date">
      <div id="calendar">
        <div>
          <button
            disabled={!canScrollBack}
            onClick={decreaseCalendarDate}
          >
            ←
          </button>
          <span>
            {moment(calendarDate).locale(locale).utcOffset(utcOffset).format("MMMM YYYY")}
          </span>
          <button onClick={increaseCalendarDate}>→</button>
        </div>
        <ul id="week_day">
          {moment.weekdaysMin(true).map((weekDay) => (
            <li key={weekDay}>{weekDay}</li>
          ))}
        </ul>
        <ListDays
          changeSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
          nonWorkingDays={["2021-6-25", "2020-5-25", "2020-7-25", "2020-6-26", "2020-6-25", "2020-6-22"]}
          nowDate={nowDate}
          calendarDate={calendarDate}
        />
      </div>

      <button
        id="calendar_btn"
        className="m_selected_WB"
      >
        <span>
          {selectedDate ? moment(selectedDate).locale(locale).utcOffset(utcOffset).format("LL") : "Select Date"}
        </span>
        {/* <svg viewBox="0 0 24 24">
          <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"></path>
          <path fill="none" d="M0 0h24v24H0z"></path>
        </svg> */}
      </button>
    </div>
  );
}

export default Calendar;
