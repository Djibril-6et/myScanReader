import React, { useState } from 'react';
import styled from "styled-components"

const Index = ({toggleTheme}) => {

    const [isToggled, setIsToggled] = useState(false);

    const toggle = () => {
        setIsToggled(!isToggled)
        toggleTheme()
    }

    return (
        <Switcher onPress={toggle}>
            <TextSwitch>Switch</TextSwitch>
        </Switcher>
    );
}

const Switcher = styled.TouchableOpacity`
    
`;

const TextSwitch = styled.Text`
    color: ${(props) => props.theme.text};
`;

export default Index;
