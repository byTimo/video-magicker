import React from 'react';
import {Source} from './core/sources';
import {VideoSource} from './core/sources/VideoSource';
import {Panel} from "./components/Panel/Panel";

export const App: React.FC = () => {
    const [sources, setSources] = React.useState<Source[]>([]);
    const [fragments, setFragments] = React.useState<Source[]>([]);

    const handleAdd = (files: File[]) => {
        setSources(prev => {
            const sources = files.map(x => new VideoSource(x));
            return [...prev, ...sources];
        })
    }

    const handleClick = (source: Source) => {
        setFragments(prev => [...prev, source])
    }

    return (
        <>
            <Panel style={{gridArea: "aside"}} header="Sources">
                Content
            </Panel>
            <Panel style={{gridArea: "main"}} header="Preview">
                main
            </Panel>
            <Panel style={{gridArea: "footer"}} header="Timeline">
                footer
            </Panel>
        </>
    )
}