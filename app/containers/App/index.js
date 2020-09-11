/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import '../../../docs/css/style.css'
import Main from '../../containers/HomePage/main'

export default function App() {
  return (
  <div>
    <Main/>
  </div>
  );
}
