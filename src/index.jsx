/* @refresh reload */
import { render } from 'solid-js/web'
import { HashRouter } from 'solid-app-router';
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')

render(() => (
    <HashRouter>
      <App />
    </HashRouter>
  ), root);
