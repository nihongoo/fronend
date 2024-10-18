import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// function eComt(id){
//   setInterval(() => {
//     window.dispatchEvent(
//       new CustomEvent(`lesson-${id}`,{
//         detail: `Nội dung cmt của ls ${id}`
//       })
//     )
//   },2000);
// }

// eComt(1)
// eComt(2)
// eComt(3)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
