import {ChangeEvent, useState} from "react";

interface useInputReturn {
    value: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const useInput = (initialValue = ''): useInputReturn => {
    const [value, setValue] = useState(initialValue)

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
    };

    return {value, onChange}
}