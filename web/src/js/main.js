// Import our custom CSS
import '../scss/styles.scss'

import '@eonasdan/tempus-dominus/dist/css/tempus-dominus.css';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);
dom.watch();
//Bootstrap is not required for the picker to work
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import './example';
import { version } from '@eonasdan/tempus-dominus';

document.getElementById(
  'info'
).innerHTML = `There may be supporting code to make the demo work that you can safely ignore.<br/>
Your browser's locale is ${navigator.language}.<br/>
You are using version ${version}.`;

window.logger = (element, verb, ...arg) => {
  const msg = document.createElement('div');
  msg.classList.add('alert');
  switch (verb) {
    case 'log':
      msg.classList.add('alert-primary');
      break;
    case 'debug':
      msg.classList.add('alert-secondary');
      break;
    case 'info':
      msg.classList.add('alert-info');
      break;
    case 'warn':
      msg.classList.add('alert-warning');
      break;
    case 'error':
      msg.classList.add('alert-danger');
      break;
  }
  const pre = document.createElement('pre');
  pre.innerHTML = arg.join(' ');
  msg.appendChild(pre);
  element.appendChild(msg);
};

const events = [
  'change.td',
  'update.td',
  'error.td',
  'show.td',
  'hide.td',
  'click.td',
];

document.querySelectorAll('.log-event').forEach((element) => {
  events.forEach((listen) => {
    element.addEventListener(listen, (e) => {
      logger(
        document.getElementById('log'),
        listen === 'error.td' ? 'error' : 'log',
        `${element.getAttribute('id')} -> ${listen}:`,
        JSON.stringify(e.detail, null, 2)
      );
    });
  });
});


// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';