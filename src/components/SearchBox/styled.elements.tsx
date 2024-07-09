import * as React from 'react';

import { darken } from 'polished';
import styled from '../../styled-components';
import { MenuItemLabel } from '../SideMenu/styled.elements';

export const SearchWrap = styled.div`
  padding: 5px 0;
  position: relative;
`;

export const SearchInput = styled.input.attrs(() => ({
  className: 'search-input',
}))`
  width: calc(100% - ${props => props.theme.spacing.unit * 4}px);
  box-sizing: border-box;
  margin: 0 ${props => props.theme.spacing.unit * 2}px;
  padding: 5px ${props => props.theme.spacing.unit}px 5px ${props => props.theme.spacing.unit * 4}px;
  border: 1px solid #ebebeb;
  border-radius: 8px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: 400;
  font-size: 13px;
  color: ${props => props.theme.sidebar.textColor};
  background-color: transparent;
  outline: none;
  ::placeholder {
    color: #000;
    opacity: 0.3;
  }
`;

export const SearchIcon = styled((props: { className?: string }) => (
  <svg
    className={props.className}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
  >
    <g strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.867-2.867" />
    </g>
  </svg>
)).attrs({
  className: 'search-icon',
})`
  position: absolute;
  left: ${props => props.theme.spacing.unit * 3.5}px;
  top: 0;
  bottom: 0;
  margin: auto 0;
  height: 16px;
  width: 16px;

  path {
    stroke: #666e7a;
  }
`;

export const SearchResultsBox = styled.div`
  padding: ${props => props.theme.spacing.unit}px 0;
  background-color: ${({ theme }) => darken(0.05, theme.sidebar.backgroundColor)}};
  color: ${props => props.theme.sidebar.textColor};
  min-height: 150px;
  max-height: 250px;
  border-top: ${({ theme }) => darken(0.1, theme.sidebar.backgroundColor)}};
  border-bottom: ${({ theme }) => darken(0.1, theme.sidebar.backgroundColor)}};
  margin-top: 10px;
  line-height: 1.4;
  font-size: 0.9em;
  
  li {
    background-color: inherit;
  }

  ${MenuItemLabel} {
    padding-top: 6px;
    padding-bottom: 6px;

    &:hover,
    &.active {
      background-color: ${({ theme }) => darken(0.1, theme.sidebar.backgroundColor)};
    }

    > svg {
      display: none;
    }
  }
`;

export const ClearIcon = styled.i`
  position: absolute;
  display: inline-block;
  width: ${props => props.theme.spacing.unit * 2}px;
  text-align: center;
  right: ${props => props.theme.spacing.unit * 4}px;
  line-height: 2em;
  vertical-align: middle;
  margin-right: 2px;
  cursor: pointer;
  font-style: normal;
  color: '#666';
`;
