import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 1000px;
  display: flex;
  background: aquamarine;
  flex-basis: 100px 100px;
  //flex-direction: row;
  justify-content: space-between;
  justify-items: center;
  flex-wrap: wrap;
`;

export const Box = styled.div`
  box-sizing: border-box;
  width: 50px;
  height: 50px;
  overflow: auto;
  margin: 10px;
  
  :nth-child(odd) {
    background: red;
  }

  :nth-child(even) {
    background: blue;
  }
`;
