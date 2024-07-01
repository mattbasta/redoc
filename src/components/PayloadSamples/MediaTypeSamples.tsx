import * as React from 'react';

import { DropdownOption, DropdownProps } from '../../common-elements';
import { MediaTypeModel } from '../../services/models';
import { Markdown } from '../Markdown/Markdown';
import { Example } from './Example';
import { NoSampleLabel } from './styled.elements';

export interface PayloadSamplesProps {
  mediaType: MediaTypeModel;
  renderDropdown: (props: DropdownProps) => JSX.Element;
}

export const MediaTypeSamples = ({
  mediaType: { examples = {}, name: mimeType },
  renderDropdown,
}: PayloadSamplesProps) => {
  const [activeIdx, setActiveIdx] = React.useState(0);

  const switchMedia = ({ idx }: DropdownOption) => {
    if (idx !== undefined) {
      setActiveIdx(idx);
    }
  };

  const examplesNames = Object.keys(examples);
  if (examplesNames.length === 0) {
    return <NoSampleLabel>No sample</NoSampleLabel>;
  }

  const options = examplesNames.map((name, idx) => {
    return {
      value: examples[name].summary || name,
      idx,
    };
  });

  const example = examples[examplesNames[activeIdx]];
  const description = example.description;

  return (
    <>
      {examplesNames.length > 1 &&
        renderDropdown({
          value: options[activeIdx].value,
          options,
          onChange: switchMedia,
          ariaLabel: 'Example',
        })}
      <div>
        {description && <Markdown source={description} />}
        <Example example={example} mimeType={mimeType} />
      </div>
    </>
  );
};
