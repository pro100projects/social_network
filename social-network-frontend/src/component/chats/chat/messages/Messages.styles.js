import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  overflow: scroll;
`;

export const Content = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

export const DayMessageGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 5px;
`;

export const DateContainer = styled.div`
  top: 0;
  position: sticky;
  width: fit-content;
  border-radius: 10px;
  box-shadow: var(--box-shadow-standart);
  padding: 6px;
  margin: 4px;
`;

export const DayMessageGroupList= styled.div`
    width: 100%;
`;

export const MessageGroup = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: left;
  align-items: end;
`;

export const MessageList = styled.div`
  width: 100%;
  margin-right: 50px;
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  align-items: ${props => props.me ? "end" : "start"};
  padding-left: ${props => props.me ? "30px" : "0"};
  padding-right: ${props => !props.me ? "30px" : "0"};
`;

export const Avatar = styled.div`
  content: '';
  background-image: url(${props => props.url});
  background-size: cover;
  border-radius: 50%;
  min-width: 40px;
  min-height: 40px;
  max-width: 40px;
  max-height: 40px;
  margin-right: -45px;
`;
