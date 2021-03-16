import React from 'react';
import { Source } from '../../core/sources/index';

export interface SourceListItemProps {
    source: Source;
    onClick: (source: Source) => void;
}

export const SourceListItem: React.FC<SourceListItemProps> = props => {
    return (
        <li title={props.source.filename}>
            <button onClick={() => props.onClick(props.source)}>
                {props.source.filename}
            </button>
        </li>
    )
}


export interface SourceListProps {
    sources: Source[];
    onClick: (source: Source) => void;
}

export const SourceList: React.FC<SourceListProps> = props => {
    return (
        <ul>
            {props.sources.map(x => <SourceListItem key={x.source.src} source={x} onClick={props.onClick}/>)}
        </ul>
    )
}