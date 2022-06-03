import styled from "styled-components";

export const Wrapper = styled.div`
  width: fit-content;
  border-radius: 10px;
  background: white;
  padding: 6px;
  margin: 5px;
  box-shadow: var(--box-shadow-standart);
`;

export const ContentMessage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
`;

export const TextMessage = styled.div`
  white-space: pre-line;
  word-break: break-word;
`;

export const AdditionalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

export const DataMessage = styled.div`
  color: gray;
  font-size: 0.6em;
  padding-left: 5px;
`;

export const ExtraMessageInfoRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ExtraMessageInfoImg = styled.img`
  width: 10px;
  height: 10px;
`;