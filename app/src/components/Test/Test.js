import React, { useEffect } from "react";

export default function Test({ shouldBeMounted }) {
  useEffect(() => {
    if (shouldBeMounted) {
      console.log("this is effect!!");

      return () => {
        console.log("this is cleanup func");
      };
    }
  });

  if (!shouldBeMounted) {
    return null;
  } else {
    return <h1>TEST</h1>;
  }
}
