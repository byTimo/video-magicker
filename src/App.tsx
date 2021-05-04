import React from 'react';
import {Panel} from "./components/Panel/Panel";
import {SourceList} from "./components/Source/SourceList";
import {ColorSource} from "./core/sources/ColorSource";
import {Timeline} from "./components/Timeline/Timeline";
import {Fragment} from "./core/renderer/Fragment";
import {RenderContextProvider} from "./RenderContext";
import {Preview} from "./components/Preview/Preview";

const hardcodeSources = [
    new ColorSource("red", 255, 0, 0),
    new ColorSource("green", 0, 255, 0),
    new ColorSource("blue", 0, 0, 255),
];

const hardcodeFragments = hardcodeSources.map(x => new Fragment(x));

export const App: React.FC = () => {
    return (
        <RenderContextProvider>
            <Panel style={{gridArea: "aside"}} header="Sources">
                <SourceList sources={hardcodeSources} onClick={() => {
                }}/>
            </Panel>
            <Panel style={{gridArea: "main"}} header="Preview">
                <Preview/>
            </Panel>
            <Panel style={{gridArea: "footer"}} header="Timeline">
                <Timeline fragments={hardcodeFragments}/>
            </Panel>
        </RenderContextProvider>
    )
}