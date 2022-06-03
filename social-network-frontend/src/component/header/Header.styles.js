import styled from 'styled-components';

export const Wrapper = styled.div`
  background: var(--darkGrey);
  padding: 0 20px;
` ;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: var(--maxWidth);
  padding: 10px 0;
  margin: 0 10px;

  a {
    text-decoration: none;
  }
  
  a:hover {
    color: white;
  }
  a:visited {
    color: white;
  }
`;

export const LeftContent = styled.div`
  display: flex;
  align-items: center;
`;

export const RightContent = styled.div`
  display: flex;
  align-items: center;
`;


export const LogoImg = styled.img`
  width: 50px;

  @media screen and (max-width: 600px) {
    width: 30px;
  }
  `;

export const Item = styled.div`
  color: var(--white);
  font-size: var(--fontMed);
  margin: 0 5px;
  padding: 5px;
  border-radius: 15px;
  
  &:hover {
    background-color: ${state => state.isLink ? "var(--grey)" : "var(--darkGrey)"};
  }
  
  &:first-of-type {
    margin-left: 20px;
  }
  
  @media screen and (max-width: 600px) {
    font-size: var(--fontSmall);
  }
`;