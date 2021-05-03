import React from "react";
import {RenderContext} from "../RenderContext";

export const Preview: React.FC = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const {bindContext, renderer} = React.useContext(RenderContext);

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
        bindContext(gl);
    }, [])

    return (
        <div>
            <canvas ref={canvasRef}/>
            <button onClick={() => renderer?.play()}>Play</button>
            <button onClick={() => renderer?.pause()}>Pause</button>
            <button onClick={() => renderer?.reset()}>Reset</button>
        </div>
    )
}