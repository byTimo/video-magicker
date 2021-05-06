import React from "react";
import styles from "./Timeline.module.css";
import {Fragment} from "../../../core/renderer/Fragment";
import {Renderer} from "../../../core/renderer/Renderer";
import {useRendererEvent} from "../../../hooks/useRenderer";

export interface TimelineProps {
    renderer: Renderer;
}

export const Timeline: React.FC<TimelineProps> = props => {
    useRendererEvent(props.renderer, "fragmentsChanged");
    useRendererEvent(props.renderer, "timestampChanged");
    const [scale, setScale] = React.useState(10);

    const left = props.renderer.timestamp / scale;
    const lineRef = React.useRef<HTMLDivElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const time = x * scale;
        props.renderer.setTime(time);
    }

    return (
        <div ref={lineRef} className={styles.line} onClick={handleClick}>
            {props.renderer.sequence.map((x, i) => <TimelineItem key={i} fragment={x.fragment} scale={scale}/>)}
            <div className={styles.pointer} style={{left}}/>
        </div>
    )
}

interface TimelineItemProps {
    fragment: Fragment;
    scale: number;
}

const TimelineItem: React.FC<TimelineItemProps> = props => {
    const width = props.fragment.duration / props.scale;

    return (
        <div className={styles.item} style={{minWidth: width}}>
            {props.fragment.duration}
        </div>
    )
}