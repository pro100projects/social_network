import styled, {keyframes} from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  overflow: scroll;
`;

export const ListChatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  max-width: 300px;
  padding: 10px;
  background: var(--white);
  
  @media screen and (max-width: 600px) {
    margin-left: -300px;
    transition: margin-left 0.8s;
  }

  @media screen and (min-width: 600px) {
    transition: margin-left 0.8s;
    box-shadow: var(--box-shadow-standart);
  }
`;

export const ListChatsHeader = styled.div`
  padding: 10px;
  flex: 0;
  height: fit-content;
`;

export const ChatContainer = styled.div`
  width: 100%;
  position: initial;
`;

export const ChatContainerBackground = styled.div`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: url(${props => props.backgroundImg});
  background-color: aqua;
  background-size: 800px 800px;
`;

export const ChatContainerBackgroundImg = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.backgroundImg});
  background-size: 800px 800px;
  opacity: 30%;
`;