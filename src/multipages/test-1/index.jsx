
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const Test1 = (props) => {

  useEffect(() => {
  }, []);

  return (
    <div className={''}>测试1页面</div>
  );
}
ReactDOM.render(<Test1/>, document.getElementById('app'));
// export default Test1;
