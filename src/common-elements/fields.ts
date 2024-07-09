import { transparentize } from 'polished';

import styled, { css, extensionsHook } from '../styled-components';
import { PropertyNameCell } from './fields-layout';
import { deprecatedCss } from './mixins';
import { ShelfIcon } from './shelfs';

export const ClickablePropertyNameCell = styled(PropertyNameCell)`
  &.deprecated {
    span.property-name {
      ${deprecatedCss}
    }
  }

  button {
    background-color: transparent;
    border: 0;
    outline: 0;
    font-size: 13px;
    font-family: ${props => props.theme.typography.code.fontFamily};
    cursor: pointer;
    padding: 0;
    color: ${props => props.theme.colors.text.primary};
    &:focus {
      font-weight: ${({ theme }) => theme.typography.fontWeightBold};
    }
    ${({ kind }) =>
      kind === 'patternProperties' &&
      css`
        display: inline-flex;
        margin-right: 20px;

        > span.property-name {
          white-space: break-spaces;
          text-align: left;

          ::before,
          ::after {
            content: '/';
            filter: opacity(0.2);
          }
        }

        > svg {
          align-self: center;
        }
      `}
  }
  ${ShelfIcon} {
    height: ${({ theme }) => theme.schema.arrow.size};
    width: ${({ theme }) => theme.schema.arrow.size};
    polygon {
      fill: ${({ theme }) => theme.schema.arrow.color};
    }
  }
`;

export const FieldLabel = styled.span`
  vertical-align: middle;
`;

export const TypePrefix = styled(FieldLabel)`
  color: ${props => transparentize(0.1, props.theme.schema.typeNameColor)};
`;

export const TypeName = styled(FieldLabel)`
  color: ${props => props.theme.schema.typeNameColor};
`;

export const TypeTitle = styled(FieldLabel)`
  color: ${props => props.theme.schema.typeTitleColor};
  word-break: break-word;
`;

export const TypeFormat = TypeName;

export const RequiredLabel = styled(FieldLabel).attrs({
  as: 'span',
})`
  color: ${props => props.theme.schema.requireLabelColor};
  border-radius: 3px;
  display: inline-block;
  font-weight: 500;
  padding: 0 4px;
`;

export const PropertyLabel = styled(RequiredLabel)`
  color: ${props => props.theme.colors.primary.light};
`;

export const RecursiveLabel = styled(FieldLabel)`
  color: ${({ theme }) => theme.colors.warning.main};
  font-size: 13px;
`;

export const PatternLabel = styled(FieldLabel)`
  color: #0e7c86;
  &::before,
  &::after {
    font-weight: bold;
  }
`;

export const ExampleValue = styled(FieldLabel)`
  border-radius: 2px;
  word-break: break-word;
  ${({ theme }) => `
    background-color: #F7F7F7;
    color: ${theme.colors.text.primary};

    padding: 0 6px;
    border: 1px solid #EBEBEB;
    font-family: ${theme.typography.code.fontFamily};
}`};
  & + & {
    margin-left: 0;
  }
  ${extensionsHook('ExampleValue')};
`;

export const ExtensionValue = styled(ExampleValue)``;

export const ConstraintItem = styled(FieldLabel)`
  ${({ theme }) => `
    color: ${theme.schema.typeNameColor};
  `};
  ${extensionsHook('ConstraintItem')};
`;

export const ToggleButton = styled.button`
  background-color: transparent;
  border: 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-left: ${({ theme }) => theme.spacing.unit}px;
  border-radius: 2px;
  cursor: pointer;
  outline-color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 12px;
`;
