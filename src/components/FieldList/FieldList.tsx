import * as React from 'react';
import styled from 'styled-components';
import { FieldModel } from '../../services';
import { RequiredLabel } from '../../common-elements/fields';
import { FieldDetails, FieldShapeDetails } from '../Fields/FieldDetails';
import { Markdown } from '../Markdown/Markdown';

export const FieldList = ({
  title,
  rows,
}: {
  title?: string;
  rows: Array<FieldModel | { name: string; description?: string; required?: boolean }>;
}) => {
  return (
    <Container>
      {title && <Title>{title}</Title>}
      <dl>
        {[...rows]
          .sort((a, b) => {
            // Sort the fields so required fields appear first
            if (a.required && !b.required) {
              return -1;
            }
            if (!a.required && b.required) {
              return 1;
            }
            return 0;
          })
          .map(field => (
            <React.Fragment key={field.name}>
              <dt>
                <FieldName style={{ marginTop: '1px' }}>{field.name}</FieldName>
                {field.required && <RequiredLabel>Required</RequiredLabel>}
                {field instanceof FieldModel && <FieldShapeDetails schema={field.schema} />}
              </dt>
              {field instanceof FieldModel ? (
                <dd>
                  <FieldDetails field={field} noShapeDetails />
                </dd>
              ) : (
                <dd>{field.description && <Markdown source={field.description} />}</dd>
              )}
            </React.Fragment>
          ))}
      </dl>
    </Container>
  );
};

const Container = styled.section`
  margin-bottom: 40px;

  dl {
    margin: 0 0 8px;
  }
  dt {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    flex-wrap: wrap;
    font-size: 14px;
    line-height: 18px;

    code {
      display: inline;
      font-family: 'Fira Code', monospace;
      font-weight: 600;
    }
    > * {
      vertical-align: middle;
    }
  }
  dt ~ dt {
    margin-top: 16px;
  }
  dd {
    display: block;
    margin: 8px 0 0;
  }
  dd p:first-child {
    margin-top: 0;
  }
`;
const Title = styled.h3`
  font-size: 20px;
  font-weight: 500;
  padding-bottom: 16px;
  border-bottom: 1px solid ${props => props.theme.colors.border.dark};
`;
const FieldName = styled.code`
  font-family: 'Fira Code', monospace;
  font-size: 16px;
  font-weight: 600;
  display: inline-block;
`;
