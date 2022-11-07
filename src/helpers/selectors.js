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
