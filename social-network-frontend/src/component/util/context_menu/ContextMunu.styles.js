import styled from 'styled-components';

export const Wrapper = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: auto;
  width: fit-content;
  padding: 10px 0;
  box-shadow: var(--box-shadow-standart);
  background: white;
  border-radius: 10px;
  display: ${props => props.visible ? 'block' : 'none'};
`;

export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  cursor: pointer;
  user-select: none;
  padding: 5px;
  
  &:hover {
    background: #e0e0e0;
  }
`;

export const ItemContent = styled.div`
  width: 100%;
  font-size: 1em;
  padding-right: 10px;
  color: ${props => props.extraStyle === 'dangerous' ? 'red' : 'inherit'}
`;

export const ItemImg = styled.img`
  height: 25px;
  width: 25px;
  margin: 0 8px;
  padding: 3px;
`;