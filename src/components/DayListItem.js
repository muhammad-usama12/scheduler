import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const formatSpots = (spots) => {
    if (spots  === 1) {
      return "1 spot remaining";
    } if (spots === 0) {
      return "no spots remaining";
    } else {
      return `${spots} spots remaining`;
    }
  };

  const dayClass = classNames("day-list", {
    "day-list__item": props.name,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  return (
    <li data-testid='day' className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
