import React from 'react'
import ReactDOM from 'react-dom'
import {App} from './App';
import "./main.css";

// let destination: Destination;
//
// const redSource = new ColorSource(255, 0, 0);
// const blueSource = new ColorSource(0, 0, 255);
//
// const fragment1 = new Fragment(redSource);
// const fragment2 = new Fragment(blueSource);
//
// document.addEventListener("DOMContentLoaded", () => {
//     const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
//     const ctx = canvas.getContext("webgl2")!;
//     const renderer = new Renderer(ctx);
//     renderer.addFragment(fragment1);
//     renderer.addFragment(fragment2);
//     renderer.addFragment(fragment1);
//     renderer.addFragment(fragment2);
//     renderer.addFragment(fragment1);
//     renderer.addFragment(fragment2);
//     renderer.addFragment(fragment1);
//     renderer.addFragment(fragment2);
//     renderer.addFragment(fragment1);
//     renderer.addFragment(fragment2);
//     renderer.addFragment(fragment1);
//     renderer.addFragment(fragment2);
//     renderer.play();
// })


document.addEventListener("DOMContentLoaded", () => {
    const root = document.createElement("div");
    document.body.appendChild(root);
    ReactDOM.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>,
        root,
    )
});
