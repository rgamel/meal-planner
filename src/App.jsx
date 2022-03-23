import React from "react";
import Autocomplete from "./components/Autocomplete";
import "./styles.css";

const App = () => {
  return (
    <div>
      <h1>React Autocomplete Demo</h1>
      <h2>Start typing and experience React autocomplete!</h2>
      <Autocomplete
        suggestions={[
          "Alligator",
          "Bask",
          "Crocodilian",
          "Death Roll",
          "Eggs",
          "Jaws",
          "Reptile",
          "Solitary",
          "Tail",
          "Wetlands"
        ]}
      />
    </div>
  );
};

export default App;
