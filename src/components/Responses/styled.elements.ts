import { UnderlinedHeader } from '../../common-elements';
import styled from '../../styled-components';
import { ResponseTitle } from './ResponseTitle';

export const StyledResponseTitle = styled(ResponseTitle)`
  display: block;
  border: 0;
  width: 100%;
  text-align: left;
  padding: 10px;
  border-radius: 2px;
  margin-bottom: 4px;
  line-height: 1.5em;
  cursor: pointer;

  color: #2a2c3a;
  background-color: #f7f7f7;
  ${props =>
    (props.empty &&
      `
cursor: default;
&::before {
  content: "—";
  font-weight: bold;
  width: 1.5em;
  text-align: center;
  display: inline-block;
  vertical-align: top;
}
&:focus {
  outline: 0;
}
`) ||
    ''};
`;

export const ResponseDetailsWrap = styled.div`
  padding: 10px;
`;

export const HeadersCaption = styled(UnderlinedHeader).attrs({
  as: 'caption',
})`
  text-align: left;
  margin-top: 1em;
  caption-side: top;
`;

export const Code = styled.strong`
  vertical-align: top;
`;
