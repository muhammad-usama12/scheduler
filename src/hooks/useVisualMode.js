import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);



  function transition(transitionMode, replace = false) {
    let newHistory = [...history]
    if (replace) {
      newHistory = newHistory.slice(0, -1)
      newHistory = [...newHistory, transitionMode]
      setHistory(newHistory);
      setMode(transitionMode);
    }
    else {
      setHistory(prev => (
        [...prev, transitionMode]
      ));
      setMode(transitionMode)
    }
  }

  function back() {
    if (history.length > 1) {
      let newHistory= [...history];
      newHistory.pop();
      setHistory(newHistory)
      setMode(newHistory[newHistory.length - 1]);
    }
  }
  return { mode, transition, back };
}
