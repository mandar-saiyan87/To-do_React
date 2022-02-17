/*No need to write this after version 17, We are using 17.0.2
  Need to import if you are using <React.Fragment/> jsx to return instead of div or other HTML


  React fragment can be defined as <React.Fragment>Content goes here</React.Fragment><React.Fragment/> 
  OR just <>Content goes here</>
*/

import React from "react";
import Todo from "./component/Basics/todo";

const App = () => {
  return (
    <>
      <Todo />
    </>
  );
};

export default App;
