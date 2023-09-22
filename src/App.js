import React, { useState } from "react";
import shuffle from "./utilities/shuffle";

function App() {
  const [cards, setCards] = useState(shuffle);

  return (
    <>
      <div className="grid"></div>
    </>
  );
}

export default App;
