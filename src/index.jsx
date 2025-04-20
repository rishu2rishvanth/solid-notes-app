/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from 'solid-app-router'; // Updated import
import './index.css';
import App from './App.jsx';

render(() => (
  <Router>
    <App />
  </Router>
), document.getElementById('root'));
