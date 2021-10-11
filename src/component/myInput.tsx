import React, {InputHTMLAttributes} from "react";
import {useField} from "formik";

export interface myInputProps extends InputHTMLAttributes<HTMLInputElement>{
    name : string,
    label? : string,
    required? : boolean
}

const MyInput:React.FC<myInputProps> = ({name , label , required , ...props})=>{

    const [field , meta] = useField(name)

    return (
        <>
            <div className={'d-flex flex-column'}>
                <label htmlFor={name}>{label}{required && <span className={'text-danger p-1'}>*</span>}</label>
                <input id={name} {...field} {...props}/>
                {meta.touched && meta.error &&
                <small className={'text-danger'}>{meta.error}</small>}
            </div>
        </>
    )
}

export default MyInput