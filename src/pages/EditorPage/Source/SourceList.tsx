import React from 'react';
import {Source} from "../../../core/sources/Source";
import styles from "./SourceList.module.css";

export interface SourceListItemProps {
    source: Source;
    onClick: () => void;
}

export const SourceListItem: React.FC<SourceListItemProps> = props => {
    return (
        <li title={props.source.name} className={styles.li} onClick={props.onClick}>{props.source.name}</li>
    )
}


export interface SourceListProps {
    sources: Source[];
    onClick: (source: Source) => void;
}

export const SourceList: React.FC<SourceListProps> = props => {
    return (
        <ul className={styles.ul}>
            {props.sources.map(x => <SourceListItem key={x.id} source={x} onClick={() => props.onClick(x)}/>)}
        </ul>
    )
}