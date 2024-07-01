import * as React from 'react';
import styled from 'styled-components';
import { Markdown } from '../Markdown/Markdown';
import { FieldModel } from '../../services';
import { RequiredLabel } from '../../common-elements/fields';

export const FieldList = ({
  title,
  rows,
}: {
  title?: string;
  rows: Array<{ name: string; description: string; required?: boolean } & Partial<FieldModel>>;
}) => {
  return (
    <Container>
      {title && <Title>{title}</Title>}
      <dl>
        {rows.map(field => (
          <React.Fragment key={field.name}>
            <dt>
              <code>{field.name}</code>
              {field.schema?.displayType && <span>{field.schema.displayType}</span>}
              {field.required && <RequiredLabel>Required</RequiredLabel>}
            </dt>
            <dd>
              {!!field.const && (
                <Markdown
                  source={`This field must be set to the exact value \`${field.const}\`.`}
                />
              )}
              <Markdown source={field.description} />
            </dd>
          </React.Fragment>
        ))}
      </dl>
    </Container>
  );
};

const Container = styled.section`
  margin-bottom: 24px;

  dl {
    margin: 0 0 8px;
  }
  dt {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    flex-wrap: wrap;
    font-size: 14px;
    line-height: 16px;

    code {
      font-family: 'Fira Code', monospace;
      font-weight: 600;
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
  font-size: 16px;
  border-bottom: 1px solid ${props => props.theme.colors.border.dark};
`;
