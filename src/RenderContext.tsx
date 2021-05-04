import React from "react";
import {Renderer} from "./core/renderer/Renderer";
import {Fragment} from "./core/renderer/Fragment";
import {ColorSource} from "./core/sources/ColorSource";

export interface RenderContextValue {
    renderer: Renderer | null;
    bindContext: (gl: WebGL2RenderingContext) => void;
}

export const RenderContext = React.createContext<RenderContextValue>({
    renderer: null,
    bindContext: () => undefined
});

const hardcodeSources = [
    new ColorSource("red", 255, 0, 0),
    new ColorSource("green", 0, 255, 0),
    new ColorSource("blue", 0, 0, 255),
];

const hardcodeFragments = hardcodeSources.map(x => new Fragment(x));

export const RenderContextProvider: React.FC = props => {
    const [renderer, setRenderer] = React.useState<Renderer | null>(null);

    const value: RenderContextValue = React.useMemo(() => ({
        renderer,
        bindContext: gl => {
            const renderer = new Renderer(gl);
            hardcodeFragments.forEach(renderer.addFragment);
            setRenderer(renderer);
            renderer.startRender();
        },
    }), [renderer]);

    return (
        <RenderContext.Provider value={value}>
            {props.children}
        </RenderContext.Provider>
    )
}