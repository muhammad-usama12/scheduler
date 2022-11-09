import React from "react";
import "./style.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
// import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

// mode templates
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = function(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    }
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
}

const deleteFn = function () {
  transition(DELETING);
  props.deleteInterview(props.id)
  .then(() => {
    transition(EMPTY);
  }) 
}


  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewers}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save} />}
      {mode === SAVING && <Status message="SAVING" />}

      {mode === DELETING && <Status message="DELETING"  />}
      {mode === CONFIRM && <Confirm message={'Are you sure you would like to delete?'} onCancel={() => back()} onConfirm={deleteFn}/>}
    </article>
  );
}
