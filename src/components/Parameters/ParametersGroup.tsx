import * as React from 'react';

import { FieldModel } from '../../services/models';

import { FieldList } from '../FieldList/FieldList';

const PLACE_NAMES = {
  header: 'Headers',
  path: 'Path parameters',
  query: 'Query parameters',
  cookie: 'Cookies',
};

export interface ParametersGroupProps {
  place: 'header' | 'path' | 'query' | 'cookie';
  parameters: FieldModel[];
}
export const ParametersGroup: React.FC<ParametersGroupProps> = ({ place, parameters }) => {
  if (!parameters || !parameters.length) {
    return null;
  }

  return <FieldList title={PLACE_NAMES[place]} rows={parameters} />;
};
