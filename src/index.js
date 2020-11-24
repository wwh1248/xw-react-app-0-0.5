
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {

  useEffect(() => {
  }, []);

  return (
    <div className={'app-wrap'}>
      Hello World!!!!!!
    </div>
  );
}
ReactDOM.render(<App/>, document.getElementById('app'));
