import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const Container = styled.div`
  width: 100%;
  height: 2rem;
  border: 2px solid ${props => props.isFocus ? "var(--darkBlue)" : "var(--whiteGrey)"};
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const SearchImg = styled.img`
  width: 2rem;
  height: 2rem;
  padding: 5px;
`;

export const EndImg = styled.img`
  width: 2rem;
  height: 2rem;
  padding: 7px;
  margin-left: auto;
  cursor: pointer;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  
  border: none;
  
  &:focus {
    outline: none;
  }
`;

