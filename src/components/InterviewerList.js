import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";
export default function InterviewerList(props) {
  const parsedInterviewerList = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        selected={interviewer.id === props.value}
        avatar={interviewer.avatar}
        setInterviewer={() => props.onChange(interviewer.id)}
        // props.setInterviewer(interviewer.id)}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewerList}</ul>
    </section>
  );
}
