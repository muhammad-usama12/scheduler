import React, { useEffect, useState } from "react";
import Appointment from "components/Appointment/index";
import "components/Application.scss";
import DayList from "./DayList";
import axios from "axios";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Lisa Nguyen",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },
  {
    id: 5,
    time: "4pm",
  },
];

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

export default function Application(props) {
  const [day, setDay] = useState([]);

  useEffect(() =>
    axios.get("/api/days").then((response) => {
      setDay(response.data);
      console.log(response);
    }, [])
  );

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={days} value={day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      </section>
      <section className="schedule">
        {appointments.map((appointment) => (
          <Appointment key={appointment.id} {...appointment} />
        ))}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
