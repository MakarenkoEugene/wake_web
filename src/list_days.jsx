import React from "react";
import moment from "moment";

function ListDays({ nonWorkingDays, selectedDate, nowDate, calendarDate, changeSelectedDate }) {
  if (!calendarDate || !nowDate) return null;

  const momentOfNowDate = moment(nowDate);
  const momentOfCalendarDate = moment(calendarDate);

  const onChangeSelectedDate = (index) => {
    changeSelectedDate(momentOfCalendarDate.date(index).format());
  };

  const nonWorkingDaysInMount = nonWorkingDays.filter(
    (date) =>
      date.split("-")[0] === momentOfCalendarDate.format("YYYY") &&
      date.split("-")[1] === momentOfCalendarDate.format("M")
  );

  const daysInMonth = Number(momentOfCalendarDate.daysInMonth());
  const dateIsNow = moment(calendarDate).isSame(nowDate, "month") && Number(momentOfNowDate.format("D"));

  const firstDayStarted = Number(moment(momentOfCalendarDate.date(1)).format("e"));

  const arr = [];
  arr.length = firstDayStarted + daysInMonth;
  arr.fill("");

  const eListDays = arr.map((item, i) => {
    const dateIndex = 1 + i - firstDayStarted;

    if (dateIndex <= 0) return <li key={i}></li>;

    const dateIsClosse = nonWorkingDaysInMount.includes(`${momentOfCalendarDate.format("YYYY-M")}-${dateIndex}`);
    const dateIsSelected = selectedDate && moment(selectedDate).isSame(moment(calendarDate).date(dateIndex));

    if (dateIsNow && dateIndex < dateIsNow) {
      return (
        <li key={i} title="Date is passed">
          <span className="date_disabled_WB">{dateIndex}</span>
        </li>
      );
    }

    if (dateIsClosse) {
      return (
        <li key={i} title="Non-working day">
          <span className="date_non_working_WB">{dateIndex}</span>
        </li>
      );
    }

    if (dateIndex === dateIsNow) {
      return (
        <li key={i}>
          <button
            className={dateIsSelected ? "m_selected_WB now_date_WB" : "now_date_WB"}
            onClick={() => onChangeSelectedDate(dateIndex)}
            autoFocus={!selectedDate}
          >
            {dateIndex}
          </button>
        </li>
      );
    }

    return (
      <li key={i}>
        <button className={dateIsSelected ? "m_selected_WB" : ""} onClick={() => onChangeSelectedDate(dateIndex)}>
          {dateIndex}
        </button>
      </li>
    );
  });

  return <ul id="days">{eListDays}</ul>;
}

export default ListDays;
