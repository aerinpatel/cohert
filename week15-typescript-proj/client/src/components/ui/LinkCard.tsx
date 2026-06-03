import type { ReactNode } from "react";

export interface LinkCardProps{
    heading: string;
    data:ReactNode;
    icon:ReactNode;
    tags?: Array<string>;
    date: string
}

export const LinkCard = (props:LinkCardProps) => {
    return <div className="border overflow-y-auto rounded-xl h-75 w-60">
        <div className="flex items-center my-3">
            <div className="mx-3">{props.icon}</div>
            <div>{props.heading}</div>
            <div className="mx-3">*</div>
            <div className="mr-3">*</div>
        </div>
        <div className="p-2">{props.data}</div>
    </div>;
}
