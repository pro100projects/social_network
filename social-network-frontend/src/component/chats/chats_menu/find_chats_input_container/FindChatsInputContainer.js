import React from 'react';
// Styles
import {
    Wrapper,
    Container,
    SearchImg,
    EndImg,
    SearchInput
} from "./FindChatsInputContainer.styles";
// Images
import searchBlackImg from '../../../../image/searchGrey.png';
import searchBlueImg from '../../../../image/searchBlue.png';
import closeSearchGreyImg from '../../../../image/closeGrey.png';
import closeSearchBlueImg from '../../../../image/closeBlue.png';

const FindChatsInputContainer = ({isFocus, setFocus, text, setText, onTextChange}) => {
    return (
        <Wrapper>
            <Container isFocus={isFocus}>
                <SearchImg src={isFocus ? searchBlueImg : searchBlackImg} />
                <SearchInput
                    placeholder="Search"
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                        if(e.target.value !== '') {
                            onTextChange(e.target.value);
                        }
                    }}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                />
                <EndImg
                    src={text !== '' ? closeSearchBlueImg : closeSearchGreyImg}
                    onClick={() => setText("")}
                />
            </Container>
        </Wrapper>
    );
}

export default FindChatsInputContainer;