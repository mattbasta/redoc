import * as React from 'react';
import styled from 'styled-components';

const SampleLanguageContext = React.createContext<{
  language: 'curl' | 'node' | 'python';
  setLanguage: (language: 'curl' | 'node' | 'python') => void;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
}>({ language: 'curl', setLanguage: () => {} });

export const SampleLanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageRaw] = React.useState<'curl' | 'node' | 'python'>(
    (localStorage.getItem('sampleLanguage') ?? 'curl') as 'curl' | 'node' | 'python',
  );
  const setLanguage = React.useCallback((lang: 'curl' | 'node' | 'python') => {
    localStorage.setItem('sampleLanguage', lang);
    setLanguageRaw(lang);
  }, []);
  return (
    <SampleLanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </SampleLanguageContext.Provider>
  );
};

export const useSampleLanguage = () => {
  const { language, setLanguage } = React.useContext(SampleLanguageContext);
  return { language, setLanguage };
};

const LanguagePickerWrapper = styled.div`
  background: #1d1e23;
  display: flex;
  border-radius: 8px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  padding: 0 ${props => props.theme.spacing.unit * 2}px 0;
  gap: ${props => props.theme.spacing.unit * 2}px;
  margin-bottom: ${props => props.theme.spacing.unit * 2}px;

  button {
    padding: 0 16px;
    line-height: 42px;
    color: #fff;
    background: transparent;
    border: 0 solid transparent;
    border-bottom-width: 2px;
    cursor: pointer;
    font-family: 'ABC Normal', sans-serif;
    font-size: 14px;
    font-weight: 450;
    padding: 0;

    &.is-selected {
      color: ${props => props.theme.colors.responses.success.color};
      border-bottom-color: ${props => props.theme.colors.responses.success.color};
    }
  }
`;

export const LanguagePicker = () => {
  const { language, setLanguage } = useSampleLanguage();

  return (
    <LanguagePickerWrapper className="language-picker-wrapper">
      <LanguageOption
        language="curl"
        name="cURL"
        isSelected={language === 'curl'}
        onClick={setLanguage}
      />
      <LanguageOption
        language="node"
        name="Node"
        isSelected={language === 'node'}
        onClick={setLanguage}
      />
      <LanguageOption
        language="python"
        name="Python"
        isSelected={language === 'python'}
        onClick={setLanguage}
      />
    </LanguagePickerWrapper>
  );
};

const LanguageOption = ({
  language,
  name,
  isSelected,
  onClick,
}: {
  language: 'curl' | 'node' | 'python';
  name: string;
  isSelected: boolean;
  onClick: (language: 'curl' | 'node' | 'python') => void;
}) => {
  return (
    <button
      className={isSelected ? 'is-selected' : undefined}
      onClick={e => {
        e.preventDefault();
        onClick(language);
      }}
    >
      {name}
    </button>
  );
};
