import React, {HTMLProps} from "react";

export interface boxStyleProps extends HTMLProps<HTMLDivElement>{
    title:string,
    description?:string
}

const BoxStyle:React.FC<boxStyleProps> = ({title , description , children , className , ...props})=>{
    return(
        <>
            <div className={`border rounded py-2 ${className}`} {...props}>
                <div className={'d-flex flex-column border-bottom px-3'}>
                    <h5 className={'mb-0'}>{title}</h5>
                    <p className={'mb-1'}>{description}</p>
                </div>
                {children}
            </div>
        </>
    )
}

export default BoxStyle