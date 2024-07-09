import styled from '../styled-components';
import { deprecatedCss } from './mixins';

export const OneOfList = styled.div`
  background: #f7f7f7;
  border-radius: 6px;
  display: flex;
  justify-content: stretch;
  padding: 2px;
  margin-bottom: 30px;
`;

export const OneOfButton = styled.button<{ $active: boolean; $deprecated: boolean }>`
  flex: 1 1;
  background-color: transparent;
  border-radius: 4px;
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  cursor: pointer;
  padding: 6px 8px;
  outline: none;
  border: 1px solid #f7f7f7;
  transition: border-color 0.2s, background-color 0.2s;

  &:focus {
    border: 1px solid #ebebeb;
  }

  ${({ $deprecated }) => ($deprecated && deprecatedCss) || ''};

  ${props => {
    if (props.$active) {
      return `
        background-color: #fff;
      `;
    }
  }}
`;

export const ArrayOpenningLabel = styled.div`
  font-size: 0.9em;
  font-family: ${props => props.theme.typography.code.fontFamily};
  &::after {
    content: ' [';
  }
`;

export const ArrayClosingLabel = styled.div`
  font-size: 0.9em;
  font-family: ${props => props.theme.typography.code.fontFamily};
  &::after {
    content: ']';
  }
`;
