import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const WriteMessageContainer = styled.div`
  width: 100%;
  flex: 0;
  padding: 10px;
`;


export const ChatInfoContainer = styled.div`
  border-left: rgba(0, 0, 0, 0.16) 1px solid;
  background: var(--white);
  flex: 0;
  padding: 10px;
`;

export const MessagesContainer = styled.div`
  flex: 1;
  height: 100%;
  overflow: scroll;
`;



