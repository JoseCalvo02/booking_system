import { useState } from 'react';

const useInputActive = () => {
    const [inputActive, setInputActive] = useState(false);

    const handleInputFocus = () => {
        setInputActive(true);
    };

    const handleInputBlur = () => {
        setInputActive(false);
    };

    return { inputActive, handleInputFocus, handleInputBlur };
};

export default useInputActive;