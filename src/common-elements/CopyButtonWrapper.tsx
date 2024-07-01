import * as React from 'react';
import { Tooltip } from '../common-elements/Tooltip';

import { ClipboardService } from '../services/ClipboardService';

export interface CopyButtonWrapperProps {
  data: any;
  children: (props: {
    renderCopyButton: (props?: React.HTMLAttributes<HTMLButtonElement>) => React.ReactNode;
  }) => React.ReactNode;
}

export const useCopy = () => {
  const [tooltipShown, setTooltipShown] = React.useState<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const showTooltip = () => {
    if (tooltipShown) clearTimeout(tooltipShown);
    setTooltipShown(
      setTimeout(() => {
        setTooltipShown(null);
      }, 1500),
    );
  };

  const copy = (data: unknown) => {
    const content = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
    ClipboardService.copyCustom(content);
    showTooltip();
  };

  return { copy, tooltipShown: !!tooltipShown };
};

export const CopyButtonWrapper = ({
  children,
  data,
}: CopyButtonWrapperProps & { tooltipShown?: boolean }): JSX.Element => {
  const { copy, tooltipShown } = useCopy();

  const renderCopyButton = (props: React.HTMLAttributes<HTMLButtonElement> = {}) => {
    return <CopyButton {...props} onClick={() => copy(data)} tooltipShown={tooltipShown} />;
  };

  return children({ renderCopyButton }) as JSX.Element;
};

const CopyIcon = ({ color = 'currentColor' }: { color?: string } = {}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
      <g stroke={color} strokeLinecap="round" strokeLinejoin="round" clipPath="url(#a)">
        <path d="M17.333 9.333h-6.666c-.737 0-1.334.597-1.334 1.334v6.666c0 .737.597 1.334 1.334 1.334h6.666c.737 0 1.334-.597 1.334-1.334v-6.666c0-.737-.597-1.334-1.334-1.334Z" />
        <path d="M6.667 14.667c-.734 0-1.334-.6-1.334-1.334V6.667c0-.734.6-1.334 1.334-1.334h6.666c.734 0 1.334.6 1.334 1.334" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M4 4h16v16H4z" />
        </clipPath>
      </defs>
    </svg>
  );
};

const supported = ClipboardService.isSupported();
export const CopyButton = ({
  onClick,
  tooltipShown,
  ...rest
}: React.HTMLAttributes<HTMLButtonElement> & { tooltipShown: boolean }) => {
  return (
    <button type="button" {...rest} onClick={e => supported && onClick?.(e)} style={{ padding: 0 }}>
      <Tooltip title={supported ? 'Copied' : 'Not supported in your browser'} open={tooltipShown}>
        <CopyIcon />
      </Tooltip>
    </button>
  );
};
