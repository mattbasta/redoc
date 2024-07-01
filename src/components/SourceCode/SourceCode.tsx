import * as React from 'react';
import { highlight } from '../../utils';

import { StyledPre } from '../../common-elements';

export interface SourceCodeProps {
  source: string;
  lang: string;
}

export const SourceCode = (props: SourceCodeProps) => {
  const { source, lang } = props;
  return <StyledPre dangerouslySetInnerHTML={{ __html: highlight(source, lang) }} />;
};
