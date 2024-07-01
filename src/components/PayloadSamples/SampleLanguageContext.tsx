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
  background: #0e0e0e;
  display: flex;
  border-radius: 6px;
  padding: 4px;
  position: fixed;
  top: 8px;
  right: ${props => props.theme.spacing.unit * 5}px;
  gap: 8px;
  z-index: 2;

  button {
    padding: 0 16px;
    line-height: 32px;
    color: #fff;
    background: transparent;
    border: none;
    cursor: pointer;
    font-family: 'ABC Normal', sans-serif;
    font-size: 14px;
    font-weight: 450;

    &.is-selected {
      background: ${props => props.theme.colors.primary.dark};
      border-radius: 6px;
    }
  }
`;

export const LanguagePicker = () => {
  const { language, setLanguage } = useSampleLanguage();

  return (
    <LanguagePickerWrapper>
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
