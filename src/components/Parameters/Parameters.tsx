import * as React from 'react';
import { ParametersGroup } from './ParametersGroup';

import { MediaContentModel } from '../../services';
import { FieldModel, RequestBodyModel } from '../../services/models';
import { Schema } from '../Schema';

import { Markdown } from '../Markdown/Markdown';
import { ConstraintsView } from '../Fields/FieldConstraints';
import styled from 'styled-components';

function safePush(obj, prop, item) {
  if (!obj[prop]) {
    obj[prop] = [];
  }
  obj[prop].push(item);
}

export interface ParametersProps {
  parameters?: FieldModel[];
  body?: RequestBodyModel;
}

const PARAM_PLACES = ['path', 'query', 'cookie', 'header'] as const;

export class Parameters extends React.PureComponent<ParametersProps> {
  orderParams(params: FieldModel[]): Record<string, FieldModel[]> {
    const res = {};
    params.forEach(param => {
      safePush(res, param.in, param);
    });
    return res;
  }

  render() {
    const { body, parameters = [] } = this.props;
    if (body === undefined && parameters === undefined) {
      return null;
    }

    const paramsMap = this.orderParams(parameters);

    const paramsPlaces = parameters.length > 0 ? PARAM_PLACES : [];

    const bodyContent = body && body.content;

    const bodyDescription = body && body.description;

    const bodyRequired = body && body.required;

    return (
      <>
        {paramsPlaces.map(place => (
          <ParametersGroup key={place} place={place} parameters={paramsMap[place]} />
        ))}
        {bodyContent && (
          <BodyContent
            content={bodyContent}
            description={bodyDescription}
            bodyRequired={bodyRequired}
          />
        )}
      </>
    );
  }
}

export function BodyContent(props: {
  content: MediaContentModel;
  description?: string;
  bodyRequired?: boolean;
}): JSX.Element {
  const { content, description } = props;
  const { isRequestType } = content;

  const { schema } =
    content.mediaTypes.find(mediaType => mediaType.name === 'application/json') ??
    content.mediaTypes[0];

  return (
    <>
      <Title>Request body</Title>
      {description !== undefined && <Markdown source={description} />}
      {schema?.type === 'object' && <ConstraintsView constraints={schema?.constraints || []} />}
      <Schema
        skipReadOnly={isRequestType}
        skipWriteOnly={!isRequestType}
        key="schema"
        schema={schema}
      />
    </>
  );
}

const Title = styled.h3`
  font-size: 20px;
  font-weight: 500;
  padding-bottom: 16px;
  border-bottom: 1px solid ${props => props.theme.colors.border.dark};
  margin-bottom: 1em;
`;
