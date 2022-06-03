import styled from "styled-components";

export const Wrapper = styled.div`
  font-size: 1.1rem;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

export const FormContainer = styled.div`
  height: calc(100% - 60px);
  width: 500px;
  margin: 30px auto;
  padding: 30px;
  background: white;
  box-sizing: border-box;
  
  border-radius: 50px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
`;

export const FormTitle = styled.div`
  font-size: 4rem;
  margin: 0 auto;
  padding-bottom: 25px;
  text-align: center;
  text-shadow: 0px 4px 3px rgba(0,0,0,0.4),
  0px 8px 13px rgba(0,0,0,0.1),
  0px 18px 23px rgba(0,0,0,0.1);
`;

export const InputContainer = styled.div`
  padding: 5px;
  margin: 5px;
  border-bottom: solid gray 2px;
`;

export const InputName = styled.label`
  width: 100%;
`;

export const InputFieldRow = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  padding: 5px;
  width: 100%;
  
  input {
    font-size: 1.3rem;
    width: 100%;
    border: none;
  }

  input:focus {
    outline: none;
  }
`;

export const BottomForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 5px 5px 5px;
`;

export const SubmitButton = styled.button`
  display: inline-block;
  outline: 0;
  border: 0;
  cursor: pointer;
  background-color: #4299e1;
  border-radius: 50px;
  padding: 8px 16px;
  font-size: 16px;
  font-weight: 700;
  color: white;
  line-height: 26px;
`;

export const ValidationException = styled.div`
  margin-bottom: 20px;
  text-align: center;
  display: inline-block;
  outline: 0;
  border: orangered solid 2px;
  cursor: pointer;
  border-radius: 50px;
  padding: 8px 16px;
  font-size: 16px;
  font-weight: 700;
  color: orangered;
  line-height: 26px;
`;


export const InputIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

