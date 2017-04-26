/**
 * @description - component develop feedback page
 * @author - bornkiller <hjj491229492@hotmail.com>
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Trigger from './trigger/Trigger';

const container = document.querySelector('.compat');

ReactDOM.render((
  <Trigger
    action={['click']}
    popup={<span>popup</span>}
    popupAlign={{
      points: ['tl', 'bl'],
      offset: [0, 3]
    }}
  >
    <a href='#'>hover</a>
  </Trigger>
), container);
