import React from "react";
import {Source} from "../../../../core/sources/Source";
import {ColorSource} from "../../../../core/sources/ColorSource";

export interface AddSourceProps {
    onAdd: (source: Source) => void;
}

export const AddSource: React.FC<AddSourceProps> = props => {
    const handleClick = () => {
        const source = new ColorSource(Date(), 150, 70, 31);
        props.onAdd(source)
    }
    return (
        <>
            <button onClick={handleClick}>+</button>
        </>
    )
}