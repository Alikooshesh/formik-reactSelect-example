import React from "react";
import {useField} from "formik";
import Select, {Props} from "react-select";

export interface mySelectProps extends Props{
    name : string,
    label? : string,
    required? : boolean ,
    sendValue? : Function
}

const MySelect:React.FC<mySelectProps> = ({name,label , sendValue , className , required , ...props}) => {

    const [field , meta , helper] = useField(name)

    return (
        <>
            <div className={`d-flex flex-column ${className}`}>
                <label htmlFor={name}>{label}{required && <span className={'text-danger p-1'}>*</span>}</label>
                <Select id={name}
                        {...field}
                        {...props}
                        onBlur={() => helper.setTouched(true)}
                        onChange={(e) => {
                            helper.setValue(e)
                            sendValue && sendValue(e.value)
                        }}/>

                {meta.touched && meta.error &&
                <small className={'text-danger'}>{meta.error}</small>}
            </div>
        </>
    )
}

export default MySelect