import React from "react";
import { Source } from "../../core/sources";
import classes from "./Sequence.module.css";

export interface SequenceProps {
    fragments: Source[];
}

export const Sequence: React.FC<SequenceProps> = props => {
    return (
        <div className={classes.container}>
            {props.fragments.map(x => (
                <div className={classes.line} title={x.filename} style={{
                    width: x.duration * 10
                }}>
                    {x.filename}
                </div>
            ))}
        </div>
    )
}