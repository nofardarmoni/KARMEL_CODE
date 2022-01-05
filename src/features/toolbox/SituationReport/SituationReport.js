import React, { useState } from "react";

export default function SituationReport() {
  const [displayGrpah, setDisplayGraph] = useState(false);
  return (
    <div
      style={{
        position: "absolute",
        width: "90vh",
        height: "60vh",
        backgroundColor: "white",
        zIndex: 1000,
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        margin: "auto",
        borderRadius: 20,
        filter: "drop-shadow(0px 5px 10px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      onClick={() => setDisplayGraph(!displayGrpah)}
    >
      <span style={{ fontFamily: "AlmoniBold", fontSize: 30 }}>
        דו"ח תמונת מצב
      </span>
      {displayGrpah ? (
        <img
          src="authorities-graph.png"
          alt="גרף תמונת מצב"
          height="80%"
          width="90%"
        />
      ) : (
        <img
          src="authorities-report.png"
          alt="דוח תמונת מצב"
          height="80%"
          width="90%"
        />
      )}
    </div>
  );
}
