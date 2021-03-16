import React from "react";
import { FC } from "react";
import styles from "./Layout.module.css";

export interface AsideProps {

}

export const Aside: FC<AsideProps> = props => {
    return (
        <aside className={styles.aside}>
            {props.children}
        </aside>
    )
}

export interface MainProps {

}

export const Main: FC<MainProps> = props => {
    return (
        <main className={styles.main}>
            {props.children}
        </main>
    )
}