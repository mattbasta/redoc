import { observer } from 'mobx-react';
import * as Sampler from 'openapi-sampler';
import * as React from 'react';
import { isPayloadSample, MediaContentModel, OperationModel } from '../../services';
import { SourceCode } from '../SourceCode/SourceCode';

import { DropdownOption, Tab, TabList, TabPanel, Tabs } from '../../common-elements';
import { InvertedSimpleDropdown } from '../PayloadSamples/styled.elements';
import { Markdown } from '../Markdown/Markdown';
import { useSampleLanguage } from '../PayloadSamples/SampleLanguageContext';

export interface RequestSamplesProps {
  operation: OperationModel;
}

@observer
export class RequestSamples extends React.Component<RequestSamplesProps> {
  operation: OperationModel;

  render() {
    const { operation } = this.props;
    const samples = operation.codeSamples;

    if (samples.length === 0) {
      return null;
    }

    return (
      <div>
        {samples.length === 1 ? (
          <div style={{ padding: '0 16px 16px' }}>
            {isPayloadSample(samples[0]) ? (
              <RequestPayloadSamples
                operation={operation}
                content={samples[0].requestBodyContent}
              />
            ) : (
              <SourceCode lang={samples[0].lang} source={samples[0].source} />
            )}
          </div>
        ) : (
          <Tabs defaultIndex={0}>
            <TabList>
              {samples.map(sample => (
                <Tab key={sample.lang + '_' + (sample.label || '')}>
                  {sample.label !== undefined ? sample.label : sample.lang}
                </Tab>
              ))}
            </TabList>
            {samples.map(sample => (
              <TabPanel key={sample.lang + '_' + (sample.label || '')}>
                {isPayloadSample(sample) ? (
                  <RequestPayloadSamples
                    operation={operation}
                    content={sample.requestBodyContent}
                  />
                ) : (
                  <SourceCode lang={sample.lang} source={sample.source} />
                )}
              </TabPanel>
            ))}
          </Tabs>
        )}
      </div>
    );
  }
}

export const RequestPayloadSamples = ({
  content,
  operation,
}: {
  content: MediaContentModel | null;
  operation: OperationModel;
}) => {
  const [activeIdx, setActiveIdx] = React.useState(0);

  let examples: Record<string, { value: object | null; summary?: string; description?: string }>;
  if (content) {
    const { mediaTypes } = content;
    const mediaType = mediaTypes.find(x => x.name === 'application/json') ?? mediaTypes[0];
    examples = mediaType.examples ?? {};
  } else {
    examples = {
      default: { value: null },
    };
  }

  const switchMedia = ({ idx }: DropdownOption) => {
    if (idx !== undefined) {
      setActiveIdx(idx);
    }
  };

  // const examplesNames = Object.keys(examples).filter(x => examples[x].value != undefined);
  const examplesNames = Object.keys(examples);
  if (examplesNames.length === 0) {
    return null;
    // examplesNames.push('default');
    // examples.default = { value: null } as any;
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
      {examplesNames.length > 1 && (
        <InvertedSimpleDropdown
          value={options[activeIdx].value}
          options={options}
          onChange={switchMedia}
          ariaLabel="Example"
        />
      )}
      <div>
        {description && <Markdown source={description} />}
        <PayloadRenderer operation={operation} body={example.value} />
      </div>
    </>
  );
};

const PayloadRenderer = ({
  operation,
  body,
}: {
  operation: OperationModel;
  body: object | null;
}) => {
  const { language } = useSampleLanguage();
  const securityHeader = getSecurityHeaderForOperation(operation);
  if (language === 'curl') {
    const command =
      'curl -X ' +
      operation.httpVerb.toUpperCase() +
      ' ' +
      operation.servers[0].url +
      operation.path +
      ' \\\n' +
      "  -d '" +
      JSON.stringify(body, null, 2).split('\n').join('\n  ') +
      "' \\\n" +
      '  -H "Content-Type: application/json" \\\n' +
      (securityHeader ? `  -H "${securityHeader[0]}: ${securityHeader[1]}" \\\n` : '') +
      operation.parameters
        .filter(x => x.in === 'header')
        .map(x => {
          return `  -H "${x.name}: ${
            x.schema.rawSchema.example ?? Sampler.sample(x.schema.schema as any, {}, {})
          }"`;
        })
        .join(' \\\n');
    return <SourceCode source={command} lang="sh" />;
  } else if (language === 'node') {
    const command =
      'const result = await fetch(\n' +
      `  "${operation.servers[0].url}${operation.path}",\n` +
      '  {\n' +
      (operation.httpVerb !== 'get' ? `    method: "${operation.httpVerb.toUpperCase()}",\n` : '') +
      '    headers: {\n' +
      (securityHeader ? `      "${securityHeader[0]}": "${securityHeader[1]}",\n` : '') +
      operation.parameters
        .filter(x => x.in === 'header')
        .map(x => {
          return `      "${x.name}": ${JSON.stringify(
            x.schema.rawSchema.example ?? Sampler.sample(x.schema.schema as any, {}, {}),
          )},\n`;
        })
        .join('') +
      (body != null ? '      "Content-Type": "application/json",\n' : '') +
      '    }\n' +
      (body != null
        ? `    body: JSON.stringify(${JSON.stringify(body, null, 2)
            .split('\n')
            .map(x => `    ${x}`)
            .join('\n')
            .trim()})\n`
        : '') +
      '  },\n' +
      ').then(res => res.json());\n';
    return <SourceCode source={command} lang="js" />;
  } else if (language === 'python') {
    const command =
      'import httpx\n' +
      '\n' +
      `response = httpx.${operation.httpVerb}(\n` +
      `  "${operation.servers[0].url}${operation.path}",\n` +
      (body
        ? `  json=${JSON.stringify(body, null, 2)
            .split('\n')
            .map(x => `  ${x}\n`)
            .join('')
            .trim()},\n`
        : '') +
      '  headers={\n' +
      (securityHeader ? `    "${securityHeader[0]}": "${securityHeader[1]}",\n` : '') +
      operation.parameters
        .filter(x => x.in === 'header')
        .map(x => {
          return `    "${x.name}": ${JSON.stringify(
            x.schema.rawSchema.example ?? Sampler.sample(x.schema.schema as any, {}, {}),
          )},\n`;
        })
        .join('') +
      '  },\n' +
      ')\n' +
      'response.raise_for_status()\n';
    return <SourceCode source={command} lang="python" />;
  } else {
    return null;
  }
};

function getSecurityHeaderForOperation(operation: OperationModel) {
  const scheme = operation.security[0]?.schemes[0];
  if (!scheme) return '';
  if (scheme.type === 'http') {
    const label = scheme.scheme === 'bearer' ? 'Bearer' : scheme.scheme === 'basic' ? 'Basic' : '';
    const value =
      scheme.scheme === 'bearer'
        ? '{{ YOUR API KEY }}'
        : scheme.scheme === 'basic'
        ? '{{ CREDENTIALS }}'
        : '';
    return ['Authorization', `${label} ${value}`] as const;
  } else if (scheme.type === 'apiKey') {
    return [scheme.name, '{{ YOUR API KEY }}'] as const;
  } else {
    return null;
  }
}
