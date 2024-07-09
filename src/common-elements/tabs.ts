import { darken } from 'polished';
import { Tabs as ReactTabs } from 'react-tabs';

import styled from '../styled-components';

export { Tab, TabList, TabPanel } from 'react-tabs';

export const Tabs = styled(ReactTabs)`
  background-color: #0e0e0e;
  border-radius: ${props => props.theme.spacing.unit}px;
  display: flex;
  flex-direction: column;
  position: relative;

  > ul {
    background: #1d1e23;
    border-radius: ${props => props.theme.spacing.unit}px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    display: flex;
    gap: ${props => props.theme.spacing.unit * 2}px;
    list-style: none;
    padding: 0 ${props => props.theme.spacing.unit * 2}px;
    margin: 0;
    border-bottom: 2px solid #1d1e23;

    > li {
      padding: 0;
      line-height: 46px;

      background: transparent;
      border-color: transparent;
      border-width: 0 0 2px;
      border-style: solid;
      cursor: pointer;
      text-align: center;
      outline: none;
      color: ${({ theme }) => darken(theme.colors.tonalOffset, theme.rightPanel.textColor)};
      font-size: 16px;
      font-weight: 450;
      margin-bottom: -2px;

      &.react-tabs__tab--selected {
        &.tab-http-success {
          color: ${props => props.theme.colors.responses.success.tabTextColor};
          border-color: ${props => props.theme.colors.responses.success.tabTextColor};
        }

        &.tab-http-redirect {
          color: ${props => props.theme.colors.responses.redirect.tabTextColor};
          border-color: ${props => props.theme.colors.responses.redirect.tabTextColor};
        }

        &.tab-http-info {
          color: ${props => props.theme.colors.responses.info.tabTextColor};
          border-color: ${props => props.theme.colors.responses.info.tabTextColor};
        }

        &.tab-http-error {
          color: ${props => props.theme.colors.responses.error.tabTextColor};
          border-color: ${props => props.theme.colors.responses.error.tabTextColor};
        }

        &:focus {
          outline: auto;
        }
      }
    }
  }
  > .react-tabs__tab-panel {
    & > div,
    & > pre {
      padding: ${props => props.theme.spacing.unit * 2}px;
      margin: 0;
    }

    & > div > pre {
      padding: 0;
    }
  }
  .tab--copybutton {
    appearance: none;
    background: transparent;
    border: 0;
    color: #a5b4c7;
    cursor: pointer;
    position: absolute;
    top: 12px;
    margin: auto 0;
    height: 24px;
    right: ${props => props.theme.spacing.unit * 2}px;
    transition: color 0.25s ease;
    &:hover {
      color: #ffffff;
    }
  }
`;

export const SmallTabs = styled(Tabs)`
  > ul {
    display: block;
    > li {
      padding: 2px 5px;
      min-width: auto;
      margin: 0 15px 0 0;
      font-size: 13px;
      font-weight: normal;
      border-bottom: 1px dashed;
      color: ${({ theme }) => darken(theme.colors.tonalOffset, theme.rightPanel.textColor)};
      border-radius: 0;
      background: none;

      &:last-child {
        margin-right: 0;
      }

      &.react-tabs__tab--selected {
        color: ${({ theme }) => theme.rightPanel.textColor};
        background: none;
      }
    }
  }
  > .react-tabs__tab-panel {
    & > div,
    & > pre {
      padding: ${props => props.theme.spacing.unit * 2}px 0;
    }
  }
`;
