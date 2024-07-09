import * as React from 'react';

import { MarkdownRenderer } from '../../services';
import { SanitizedMarkdownHTML } from './SanitizedMdBlock';

export interface StylingMarkdownProps {
  compact?: boolean;
  inline?: boolean;
}

export interface BaseMarkdownProps {
  sanitize?: boolean;
  source: string;
}

export type MarkdownProps = BaseMarkdownProps &
  StylingMarkdownProps & {
    source: string;
    className?: string;
    'data-role'?: string;
  };

export const Markdown: React.FC<MarkdownProps> = ({
  source,
  inline,
  compact,
  className,
  'data-role': dataRole,
}) => {
  const renderer = new MarkdownRenderer();
  return (
    <SanitizedMarkdownHTML
      html={renderer.renderMd(source)}
      inline={inline}
      compact={compact}
      className={className}
      data-role={dataRole}
    />
  );
};
