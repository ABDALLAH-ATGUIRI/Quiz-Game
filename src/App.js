import React, { Fragment } from "react";
import Quiz from "./components/Quiz";
import { Background } from "./components/Background";

const App = () => {
  return (
    <Fragment>
      <Background>
        <Quiz />
      </Background>
    </Fragment>
  );
};

export default App;
