import React from "react";
import styles from "./Panel.module.css";

export interface PanelProps {
    header?: React.ReactNode;
    footer?: React.ReactNode;
    style?: React.CSSProperties;
}

export const Panel: React.FC<PanelProps> = props => {
    return (
        <section className={styles.panel} style={props.style}>
            <div className={styles.header}>
                {props.header}
            </div>
            <div className={styles.content}>
                {props.children}
            </div>
            <div className={styles.footer}>
                {props.footer}
            </div>
        </section>
    )
}