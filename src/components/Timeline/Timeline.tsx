import React from "react";
import styles from "./Timeline.module.css";
import {Fragment} from "../../core/renderer/Fragment";
import {RenderContext} from "../../RenderContext";

function useRenderer() {
    const {renderer} = React.useContext(RenderContext);
    const [, setTime] = React.useState(Date.now());

    React.useEffect(() => {
        if (renderer != null) {
            return renderer.addEventListener(() => setTime(Date.now()));
        }
    }, [renderer]);

    return renderer;
}

export interface TimelineProps {
    fragments: Fragment[];
}

export const Timeline: React.FC<TimelineProps> = props => {
    const renderer = useRenderer();
    const [scale, setScale] = React.useState(10);
    const left = (renderer?.current ?? 0) / scale;
    const lineRef = React.useRef<HTMLDivElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const time = x * scale;
        renderer?.setTime(time);
    }

    return (
        <div ref={lineRef} className={styles.line} onClick={handleClick}>
            {props.fragments.map((x, i) => <TimelineItem key={i} fragment={x} scale={scale}/>)}
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