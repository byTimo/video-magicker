import React from "react";
import {Renderer, RendererEvent} from "../core/renderer/Renderer";

export function useRendererEvent(renderer: Renderer, event: RendererEvent): void {
    const [, setTime] = React.useState(Date.now());
    React.useEffect(() => {
        return renderer.addEventListener(event, () => setTime(Date.now()));
    }, [renderer]);
}