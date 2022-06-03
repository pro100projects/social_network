import styled from 'styled-components';

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