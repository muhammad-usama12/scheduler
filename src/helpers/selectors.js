export function getAppointmentsForDay(state, day) {
  const result = [];
  const selectedDay = state.days.filter((dayName) => dayName.name === day)[0];

  if (!selectedDay) {
    return result;
  }
  const appointmentCheck = selectedDay.appointments.map(
    (appointment) => state.appointments[appointment]
  );

  return appointmentCheck;
}

export function getInterview(state, interview) {
  const result = {};
  if (!interview) {
    return null;
  }

  result.interviewer = state.interviewers[interview.interviewer];
  result.student = interview.student;

  return result;
}

export function getInterviewersForDay(state, day) {
  const result = [];
  const selectedDay = state.days.filter((dayName) => dayName.name === day)[0];

  if (!selectedDay) {
    return result;
  }

  const interviewCheck = selectedDay.interviewers.map(
    (interview) => state.interviewers[interview]
  );
  return interviewCheck;
}

export function addComment() {
  return axios
    .post("/api/comments/new", {
      text: text,
    })
    .then((res) => {
      setState((prev) => ({ ...prev, comments: [...prev.comments, res.data] }));
      console.log("res from commentForm.js: ", res);
    });
}
export function addPost() {
  return axios
    .post("/api/posts/new", {
      text: text,
      show: show,
    })
    .then((res) => {
      setState((prev) => ({ ...prev, posts: [...prev.posts, res.data] }));
      console.log("res from write.js: ", res);
    });
}
