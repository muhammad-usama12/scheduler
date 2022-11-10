import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  const setDay = (day) => setState({ ...state, day });

  function updateSpot(interview) {
    // pick day based on user selection
    const day = state.days.find((indvDay) => indvDay.name === state.day);
    // update spot based on interview
    if (interview) {
      day.spots -= 1;
    } else {
      day.spots += 1;
    }
    // create new day data based on update from the user
    const days = [...state.days];
    days[day.id - 1] = day;
    return days;
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // assign and call update function to update day result in the server
    const days = updateSpot(appointment.interview);
    return axios.put(`api/appointments/${id}`, appointment).then((result) => {
      setState({
        ...state,
        days,
        appointments,
      });
    });
  }

  function deleteInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    // assign and call update function to update day result in the server
    const days = updateSpot(appointment.interview);
    return axios
      .delete(`api/appointments/${id}`, appointment)
      .then((result) => {
        setState({
          ...state,
          days,
          appointments,
        });
      });
  }
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: { ...all[1].data },
          interviewers: { ...all[2].data },
        }));
      })
      .catch((e) => console.log(e));
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    deleteInterview,
  };
}
