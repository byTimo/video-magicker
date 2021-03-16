import React from 'react';
import { Source } from './core/sources';
import { VideoSource } from './core/sources/VideoSource';
import { FileUpload } from './components/FileUpload/FileUpload';
import { SourceList } from './components/Source/SourceList';
import { Sequence } from './components/Sequence/Sequence';
import { Aside, Main } from './components/Layout/Layout';

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
            <Aside>
                <FileUpload onAdd={handleAdd} />
                <SourceList sources={sources} onClick={handleClick} />
            </Aside>
            <Main>
                <Sequence fragments={fragments} />
            </Main>
        </>
    )
}