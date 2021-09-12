import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const initialState = { Reference: null, Drawed: null, Advice: null, score: 0 };

const reducer = (
  state = initialState,action
) => {
  switch (action.type) {
    case 'SET_REFERENCE':
      return {
        ...state,
        Reference: [action.image, action.url],
      };
    case 'SET_DRAWED':
      return {
         ...state,
          Drawed : [action.image, action.url],
      };
   case 'SET_ADVICE':
      return {
        ...state,
          Advice : action.image,
      };
   case 'SET_SCORE':
      return {
        ...state,
          score : action.score,
      };

    default:
      return state;
  };
};
const store = createStore(reducer);

export default store;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
