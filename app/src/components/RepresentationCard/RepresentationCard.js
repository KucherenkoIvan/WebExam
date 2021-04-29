import React from "react";
import s from "./style.scss";

export default function RepresentationCard({ title, children, orientation, ...rest }) {
  return (
    <div className="representationCard">
      <div className={`horizontalText horizontalText__${orientation?.toLowerCase() === 'r' ? 'R' : 'L'}`}>
        {title}
      </div>
      <div className="mainText">
        {children}
      </div>    
    </div>
  );
}
