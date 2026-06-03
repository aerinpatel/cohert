import type { ReactElement, ReactNode } from "react";

export interface ButtonProps {
    variant: "primary"|"secondary";
    // logo: any;
    size: "sm"|"md"|"lg";
    text:string;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    onClick: () => void;

}

const szStyles = {
    "lg":"px-8 py-4 text-lg",
    "md":"px-4 py-2 text-md",
    "sm":"px-2 py-1 text-sm",
}

export const Button = (props:ButtonProps) =>{
    return <button className={`flex justify-center items-center border border-transparent ${szStyles[props.size]} rounded-xl ${props.variant == "primary" ? "bg-[#5046E4] text-white":"bg-[#E0E7FF] text-[#3F35B8]"}`}>
        {props.startIcon ? <div className="mr-3 ">
            {props.startIcon}
        </div> : null}
        {props.text}
        {props.endIcon ? <div className="ml-3">
            {props.endIcon}
        </div>:null}
    </button>
}