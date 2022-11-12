import React from "react";
import "./style.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

// mode templates
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE = "ERROR_SAVE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((error) => transition(ERROR_SAVE, true));
  };

  const deleteFn = function () {
    transition(DELETING, true);
    props
      .deleteInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => transition(ERROR_DELETE, true));
  };
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
          name={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
      )}
      {mode === SAVING && <Status message="SAVING" />}

      {mode === DELETING && <Status message="DELETING" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={back}
          onConfirm={deleteFn}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error message="There was an error while deleting" onClose={back} />
      )}
      {mode === ERROR_SAVE && (
        <Error message="There was an error while saving" onClose={back} />
      )}
    </article>
  );
}
