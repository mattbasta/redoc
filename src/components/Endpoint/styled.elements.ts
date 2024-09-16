import styled from '../../styled-components';

export const OperationEndpointWrap = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

export const ServerRelativeURL = styled.span`
  font-family: ${props => props.theme.typography.code.fontFamily};
  margin-left: 10px;
  flex: 1;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

export const EndpointInfo = styled.div<{ $inverted?: boolean }>`
  outline: 0;
  font-family: 'Fira Code', monospace;
  color: inherit;
  width: 100%;
  text-align: left;
  border: 1px solid #ebebeb;
  border-radius: 8px;
  background-color: ${props =>
    props.$inverted ? '#F7F7F7' : props.theme.codeBlock.backgroundColor};
  display: flex;
  white-space: nowrap;
  align-items: center;
  transition: border-color 0.25s ease;
  padding: 0 12px;
  line-height: 44px;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;

  .${ServerRelativeURL} {
    color: ${props => (props.$inverted ? props.theme.colors.text.primary : '#ffffff')};
  }
  &:focus {
    box-shadow:
      inset 0 2px 2px rgba(0, 0, 0, 0.45),
      0 2px 0 rgba(128, 128, 128, 0.25);
  }
  > b {
    font-weight: normal;
  }
`;

export const ServersOverlay = styled.div<{ $expanded: boolean }>`
  position: absolute;
  width: 100%;
  z-index: 100;
  background: ${props => props.theme.rightPanel.servers.overlay.backgroundColor};
  color: ${props => props.theme.rightPanel.servers.overlay.textColor};
  box-sizing: border-box;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.33);
  overflow: hidden;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  transition: all 0.25s ease;
  visibility: hidden;
  ${props => (props.$expanded ? 'visibility: visible;' : 'transform: translateY(-50%) scaleY(0);')}
`;

export const ServerItem = styled.div`
  padding: 10px;
`;

export const ServerUrl = styled.div`
  padding: 5px;
  border: 1px solid #ccc;
  background: ${props => props.theme.rightPanel.servers.url.backgroundColor};
  word-break: break-all;
  color: ${props => props.theme.colors.primary.main};
  > span {
    color: ${props => props.theme.colors.text.primary};
  }
`;
