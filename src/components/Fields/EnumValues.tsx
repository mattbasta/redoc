import * as React from 'react';
import { OptionsContext } from '../OptionsProvider';
import { l } from '../../services/Labels';
import { ExampleValue } from '../../common-elements/fields';
import { FieldDetail } from './FieldDetail';

export interface EnumValuesProps {
  values: string[];
  isArrayType: boolean;
}

export const EnumValues: React.FC<EnumValuesProps> = ({ values, isArrayType }) => {
  const { enumSkipQuotes } = React.useContext(OptionsContext);

  if (!values.length) {
    return null;
  }

  return (
    <FieldDetail
      label={
        (isArrayType ? l('enumArray') : '') +
        (values.length === 1 ? l('enumSingleValue') : l('enum')) +
        ':'
      }
    >
      {values.map((value, idx) => {
        const exampleValue = enumSkipQuotes ? String(value) : JSON.stringify(value);
        return (
          <React.Fragment key={idx}>
            <ExampleValue>{exampleValue}</ExampleValue>
          </React.Fragment>
        );
      })}
    </FieldDetail>
  );
};
