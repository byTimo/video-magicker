import React from "react";
import styles from "./Preview.module.css";
import {Renderer} from "../../../core/renderer/Renderer";

export interface PreviewProps {
    renderer: Renderer;
}

export const Preview: React.FC<PreviewProps> = props => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useLayoutEffect(() => {
        if (canvasRef.current == null) {
            console.error("Can't ref preview");
            return;
        }

        const gl = canvasRef.current.getContext("webgl2");
        if (gl == null) {
            console.error("Can't get webgl2 context in preview");
            return;
        }
        props.renderer.bindContext(gl);
    }, [props.renderer]);

    return (
        <div className={styles.preview}>
            <div className={styles.canvas}>
                <canvas style={{height: "100%"}} ref={canvasRef}/>
            </div>
            <div className={styles.buttons}>
                <button onClick={() => props.renderer.play()}>Play</button>
                <button onClick={() => props.renderer.pause()}>Pause</button>
            </div>
        </div>
    )
}