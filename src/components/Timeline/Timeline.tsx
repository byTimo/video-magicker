import React from "react";
import styles from "./Timeline.module.css";
import {Fragment} from "../../core/renderer/Fragment";

export interface TimelineProps {
    fragments: Fragment[]
}

const hardcodeScale = 10; //ms/px

export const Timeline: React.FC<TimelineProps> = props => {
    return (
        <div className={styles.line}>
            {props.fragments.map((x, i) => <TimelineItem key={i} fragment={x} scale={hardcodeScale}/>)}
        </div>
    )
}

interface TimelineItemProps {
    fragment: Fragment;
    scale: number;
}

const TimelineItem: React.FC<TimelineItemProps> = props => {
    const width = props.fragment.duration/props.scale;

    return (
        <div className={styles.item} style={{minWidth: width}}>
            {props.fragment.duration}
        </div>
    )
}