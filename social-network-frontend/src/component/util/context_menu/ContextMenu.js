import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
// Styles
import { Wrapper, ItemWrapper, ItemImg, ItemContent } from './ContextMunu.styles';
// Images
import editedImg from '../../../image/edited.svg';


const MyCustomContextMenu = ({targetId, items}) => {
    const [contextData, setContextData]= useState({ visible:false, posX: 0, posY: 0});
    const contextRef = useRef(null);

    useEffect(() => {
        const contextMenuEventHandler = (event) => {
            const targetElement = document.getElementById(targetId)
            if (targetElement && targetElement.contains(event.target)){
                event.preventDefault();
                setContextData({ visible: true, posX: event.clientX, posY: event.clientY })
            }
            else if(contextRef.current && !contextRef.current.contains(event.target)) {
                setContextData({ ...contextData, visible: false })
            }
        }

        const offClickHandler= (event) => {
            if(contextRef.current && !contextRef.current.contains(event.target)){
                setContextData({ ...contextData, visible: false })
            }
        }

        document.addEventListener('contextmenu', contextMenuEventHandler)
        document.addEventListener('click', offClickHandler)
        return () => {
            document.removeEventListener('contextmenu', contextMenuEventHandler)
            document.removeEventListener('click', offClickHandler)
        }
    }, [contextData, targetId])

    useLayoutEffect(() => {
        if(contextData.posX + contextRef.current?.offsetWidth > window.innerWidth){
            setContextData({ ...contextData, posX: contextData.posX - contextRef.current?.offsetWidth})
        }
        if(contextData.posY + contextRef.current?.offsetHeight > window.innerHeight){
            setContextData({ ...contextData, posY: contextData.posY - contextRef.current?.offsetHeight})
        }
    }, [contextData])


    return (
        <Wrapper key={`context_menu_${targetId}`} ref={contextRef} visible={contextData.visible} style={{top: contextData.posY,left: contextData.posX}} top={contextData.posX} left={contextData.posY}>
            {items.map(item =>
                <ItemWrapper key={`context_menu_item_${item.name}_${targetId}`} onClick={() => {
                    item.action();
                    setContextData({ ...contextData, visible: false });
                }}>
                    <ItemImg src={item.icon}/>
                    {
                        item.extraStyle && item.extraStyle === 'dangerous'
                            ? <ItemContent extraStyle='dangerous'>{item.name}</ItemContent>
                            : <ItemContent>{item.name}</ItemContent>
                    }
                </ItemWrapper>)}
        </Wrapper>
    );
}

export default MyCustomContextMenu;