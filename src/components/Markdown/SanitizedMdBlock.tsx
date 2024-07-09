import * as DOMPurify from 'dompurify';
import * as React from 'react';

import { OptionsContext } from '../OptionsProvider';
import { StylingMarkdownProps } from './Markdown';
import { StyledMarkdownBlock } from './styled.elements';
import styled from 'styled-components';

const StyledMarkdownSpan = styled(props => <StyledMarkdownBlock {...props} />)`
  display: inline;
`;

const sanitize = (untrustedSpec: boolean, html: string) =>
  untrustedSpec ? DOMPurify.sanitize(html) : html;

export function SanitizedMarkdownHTML({
  inline,
  compact,
  ...rest
}: StylingMarkdownProps & { html: string; className?: string; 'data-role'?: string }) {
  const Wrap = inline ? StyledMarkdownSpan : StyledMarkdownBlock;
  const options = React.useContext(OptionsContext);

  return (
    <Wrap
      className={'redoc-markdown ' + (rest.className || '')}
      dangerouslySetInnerHTML={{
        __html: sanitize(options.untrustedSpec, rest.html),
      }}
      data-role={rest['data-role']}
      {...rest}
      $inline={inline}
      $compact={compact}
    />
  );
}
