import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { RedocStandalone } from '../../src';

import * as spec from '../spec.json';

// window.addEventListener('DOMContentLoaded', () => {
const container = document.getElementById('example');
const root = createRoot(container!);
root.render(
  <RedocStandalone
    spec={spec}
    options={{
      nativeScrollbars: false,
      maxDisplayedEnumValues: 3,
      onlyRequiredInSamples: true,
      disableSearch: true,
    }}
  />,
);
// });
