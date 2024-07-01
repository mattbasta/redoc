import { observer } from 'mobx-react';
import * as React from 'react';

import { OperationModel } from '../../services/models';

import { Tab, TabList, TabPanel, Tabs } from '../../common-elements';
import { InvertedSimpleDropdown, NoSampleLabel } from '../PayloadSamples/styled.elements';
import { Markdown } from '../Markdown/Markdown';
import { CopyButton, useCopy } from '../../common-elements/CopyButtonWrapper';
import { ExampleValue } from '../PayloadSamples/ExampleValue';

export interface ResponseSamplesProps {
  operation: OperationModel;
}

export const ResponseSamples = observer(({ operation }: ResponseSamplesProps) => {
  const responses = operation.responses.filter(response => {
    return response.content?.hasSample;
  });

  const { copy, tooltipShown } = useCopy();

  const [selectedExamples, setSelectedExamples] = React.useState<number[]>(responses.map(() => 0));

  if (responses.length === 0) {
    return null;
  }

  return (
    <Tabs defaultIndex={0}>
      <TabList>
        {responses.map(response => (
          <Tab className={'tab-http-' + response.type} key={response.code}>
            {response.code}
          </Tab>
        ))}
      </TabList>
      {responses.map((response, i) => {
        const { examples = {}, name: mimeType } =
          response.content!.mediaTypes.find(x => x.name === 'application/json') ??
          response.content!.mediaTypes[0];

        let content: React.ReactNode = null;
        let copyableData: unknown;

        const examplesNames = Object.keys(examples);
        if (examplesNames.length === 0) {
          content = <NoSampleLabel>No sample</NoSampleLabel>;
        } else {
          const exampleName = examplesNames[selectedExamples[i]];
          const example = examples[exampleName];
          copyableData = example.value;
          const description = example.description;

          content = (
            <>
              {examplesNames.length > 1 && (
                <InvertedSimpleDropdown
                  value={exampleName}
                  options={examplesNames.map((name, idx) => {
                    return {
                      title: examples[name].summary,
                      value: name,
                      idx,
                    };
                  })}
                  variant="dark"
                  onChange={x =>
                    setSelectedExamples(state => state.map((v, j) => (i === j ? x.idx! : v)))
                  }
                  ariaLabel="Example"
                />
              )}
              {description && <Markdown source={description} />}
              <ExampleValue value={example.value} mimeType={mimeType} />
            </>
          );
        }

        return (
          <TabPanel key={response.code}>
            {!!copyableData && (
              <CopyButton
                onClick={() => copy(copyableData)}
                tooltipShown={tooltipShown}
                className="tab--copybutton"
              />
            )}
            <div>{content}</div>
          </TabPanel>
        );
      })}
    </Tabs>
  );
});
