import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(transitionMode, replace = false) {
    if (replace) {
      history.pop();
    }
    history.push(transitionMode);
    setHistory(history);
    setMode(transitionMode);
  }

  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    }
  }
  return { mode, transition, back };
}
