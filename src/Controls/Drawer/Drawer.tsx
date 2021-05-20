import React from "react";
import {createPortal} from "react-dom";

import styles from "./Drawer.module.css";

export interface DrawerProps {
    header: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = props => {
    const rootRef = React.useRef<HTMLElement>();
    const element = rootRef.current || (rootRef.current = document.createElement("aside"))

    React.useEffect(() => {
        document.body.appendChild(element);
        return () => {
            document.body.removeChild(element)
        };
    }, []);

    return createPortal((
        <DrawerContainer header={props.header}>
            {props.children}
        </DrawerContainer>
    ), element);
}

const DrawerContainer: React.FC<DrawerProps> = props => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    {props.header}
                </div>
                <div className={styles.inside}>
                    {props.children}
                </div>
            </div>
        </>
    )
}