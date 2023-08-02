import React from "react";
import Nav from "./Nav";
import Routing from './Routing';

function App() {
  return (
    <div className="App">
      <div className="m-auto w-[500px] flex justify-bewteen flex-col flex-wrap">
        <Nav />
        <Routing />
      </div>
    </div>
  );
}

export default App;
