import styled from 'styled-components';

export const ListChatsContent = styled.div`
  background: var(--white);
  background: white;
  flex: 1;
  overflow: auto;
  
  a {
    color: black;
    text-decoration: none;
  }
`;

export const ListChatsContentTitle = styled.div`
  padding: 5px;
  color: var(--grey);
`;

export const ChatBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  border-radius: 10px;
  background: ${props => props.selected ? 'var(--darkBlue)' : 'none'};
  
  &:hover {
    background: ${props => props.selected ? 'var(--darkBlue)' : 'var(--whiteGrey)'};
  }
`;

export const ChatBoxAvatar = styled.div`
  background-image: url(${props => props.backgroundImg});
  background-size: cover;
  border-radius: 50%;
  min-width: 40px;
  min-height: 40px;
  max-width: 40px;
  max-height: 40px;
`;

export const ChatBoxText = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 0 5px;
`;

export const ChatBoxTextChatName = styled.div`
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: bold;
  color: ${props => props.selected ? 'white' : 'black'};
`;

export const ChatBoxTextLastMessageText = styled.div`
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: ${props => props.selected ? 'white' : 'var(--grey)'};
`;

export const ChatBoxExtra = styled.div`
  width: 40px;
  font-size: 0.7rem;
  color: ${props => props.selected ? 'white' : 'var(--grey)'};
`;
