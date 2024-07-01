import * as React from 'react';
import { OperationModel } from '../../services';

import { EndpointInfo, ServerRelativeURL } from './styled.elements';

export interface EndpointProps {
  operation: OperationModel;

  hideHostname?: boolean;
  inverted?: boolean;
  compact?: boolean;
}

export interface EndpointState {
  expanded: boolean;
}

export class Endpoint extends React.Component<EndpointProps> {
  render() {
    const { operation, inverted } = this.props;
    return (
      <EndpointInfo $inverted={inverted}>
        <b>{operation.httpVerb.toUpperCase()}</b>
        <ServerRelativeURL>{operation.path}</ServerRelativeURL>
      </EndpointInfo>
    );
  }
}
