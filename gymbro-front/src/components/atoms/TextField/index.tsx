import { FieldError } from "react-hook-form/dist/types";
import { useStyles } from "./style";

interface InputProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type: string;
    width: string;
    fontSize?: string;
    heigth?: string;
    error?: FieldError;
    value?: string | number;
}

const CustomInput: React.FC<InputProps> = ({ value, onChange, placeholder, type, width, fontSize, heigth, error }) => {
    const classes = useStyles()

    return (
        <>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={classes.inputStyle}
                style={error
                    ?
                    { marginBottom: '0px', width: width, fontSize: fontSize, borderColor: '#F94C66' }
                    :
                    { marginBottom: '20px', width: width, fontSize: fontSize }}
            />
            {error && <span style={{ color: "#F94C66", display:'inline-block' }}>*{error.message}</span>}
        </>
    );
}

export default CustomInput;