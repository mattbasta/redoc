import * as React from 'react';
import { observer } from 'mobx-react';

import {
  ExampleValue,
  RecursiveLabel,
  TypeFormat,
  TypeName,
  TypePrefix,
} from '../../common-elements/fields';
import { getSerializedValue, isObject } from '../../utils';
import { ExternalDocumentation } from '../ExternalDocumentation/ExternalDocumentation';
import { Markdown } from '../Markdown/Markdown';
import { EnumValues } from './EnumValues';
import { Extensions } from './Extensions';
import { FieldProps } from './Field';
import { Examples } from './Examples';
import { ConstraintsView } from './FieldConstraints';
import { FieldDetail } from './FieldDetail';

import { Badge } from '../../common-elements/';

import { l } from '../../services/Labels';
import { OptionsContext } from '../OptionsProvider';
import { Pattern } from './Pattern';
import { ArrayItemDetails } from './ArrayItemDetails';
import { SchemaModel } from '../../services/models';

export const FieldDetailsComponent = observer(
  (props: FieldProps & { noShapeDetails?: boolean }) => {
    const { enumSkipQuotes } = React.useContext(OptionsContext);

    const { showExamples, field, renderDiscriminatorSwitch } = props;
    const { schema, description, deprecated, extensions, in: _in, const: _const } = field;
    const isArrayType = schema.type === 'array';

    const rawDefault = enumSkipQuotes || _in === 'header'; // having quotes around header field default values is confusing and inappropriate

    const renderedExamples = React.useMemo<JSX.Element | null>(() => {
      if (showExamples && (field.example !== undefined || field.examples !== undefined)) {
        if (field.examples !== undefined) {
          return <Examples field={field} />;
        } else {
          const value = getSerializedValue(field, field.example);
          return (
            <FieldDetail label={l('example') + ':'}>
              <ExampleValue>{field.in ? String(value) : JSON.stringify(value)}</ExampleValue>
            </FieldDetail>
          );
        }
      }

      return null;
    }, [field, showExamples]);
    const defaultValue =
      isObject(schema.default) && field.in
        ? getSerializedValue(field, schema.default).replace(`${field.name}=`, '')
        : schema.default;

    return (
      <div>
        {!props.noShapeDetails && (
          <div>
            <FieldShapeDetails schema={schema} />
          </div>
        )}
        {deprecated && (
          <div>
            <Badge type="warning"> {l('deprecated')} </Badge>
          </div>
        )}
        {!_const && defaultValue != null && (
          <FieldDetail label={l('default') + ':'}>
            <ExampleValue>
              {rawDefault ? String(defaultValue) : JSON.stringify(defaultValue)}
            </ExampleValue>
          </FieldDetail>
        )}
        {!renderDiscriminatorSwitch && !_const && (
          <EnumValues isArrayType={isArrayType} values={schema.enum} />
        )}{' '}
        {renderedExamples}
        <Extensions extensions={{ ...extensions, ...schema.extensions }} />
        <div>
          <Markdown compact={true} source={description} />
        </div>
        {schema.externalDocs && (
          <ExternalDocumentation externalDocs={schema.externalDocs} compact={true} />
        )}
        {(renderDiscriminatorSwitch && renderDiscriminatorSwitch(props)) || null}
        {_const && <Markdown source={`This field must be set to the exact value \`${_const}\`.`} />}
      </div>
    );
  },
);

export const FieldDetails = React.memo<FieldProps & { noShapeDetails?: boolean }>(
  FieldDetailsComponent,
);

export const FieldShapeDetails = ({ schema }: { schema: SchemaModel }) => {
  const isArrayType = schema.type === 'array';

  return (
    <>
      {schema.typePrefix && <TypePrefix>{schema.typePrefix}</TypePrefix>}
      <TypeName>{schema.displayType}</TypeName>
      {schema.displayFormat && (
        <TypeFormat>
          {' '}
          &lt;
          {schema.displayFormat}
          &gt;{' '}
        </TypeFormat>
      )}
      {schema.contentEncoding && (
        <TypeFormat>
          {' '}
          &lt;
          {schema.contentEncoding}
          &gt;{' '}
        </TypeFormat>
      )}
      {schema.contentMediaType && (
        <TypeFormat>
          {' '}
          &lt;
          {schema.contentMediaType}
          &gt;{' '}
        </TypeFormat>
      )}
      <ConstraintsView constraints={schema.constraints} />
      <Pattern schema={schema} />
      {schema.isCircular && <RecursiveLabel> {l('recursive')} </RecursiveLabel>}
      {isArrayType && schema.items && <ArrayItemDetails schema={schema.items} />}
    </>
  );
};
