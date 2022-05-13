import React from "react";
import Event from "./Event";

export default function EventsLayer({ events }) {
  return (
    <>
      {events.map((event) => (
        <Event key={event.id} event={event} />
      ))}
    </>
  );
}
