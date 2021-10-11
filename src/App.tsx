import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {MyForm} from "./component/myForm";
import BoxStyle from "./component/boxStyle";

function App() {
  return (
    <>
      <div className={'w-100 d-flex justify-content-between align-items-lg-center'}>
        <div className={'w-75 p-5'}>
          <MyForm/>
        </div>
      </div>
    </>
  );
}

export default App;
