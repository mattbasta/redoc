import * as React from 'react';
import styled from 'styled-components';

export const FieldDetail = React.memo(function FieldDetail({
  label,
  children,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Wrapper>
      <Label>{label}</Label>
      {children}
    </Wrapper>
  );
});

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 4px;
  gap: 8px;
`;

const Label = styled.span`
  font-family: ${props => props.theme.typography.code.fontFamily};
  font-size: 14px;
  font-weight: 500;
`;
