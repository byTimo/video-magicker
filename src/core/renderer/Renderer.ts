import {Sequence} from "./Sequence";
import {Fragment} from "./Fragment";

export type RendererEvent = "fragmentsChanged" | "timestampChanged";
export type Listener = (event: RendererEvent) => void;

export class Renderer {
    public readonly sequence = new Sequence();
    public timestamp: number = 0;

    private listeners: Record<RendererEvent, Listener[]> = {
        timestampChanged: [],
        fragmentsChanged: [],
    }

    private playTimerId: number | null = null;

    constructor(private gl?: WebGL2RenderingContext) {
    }

    public addEventListener = (event: RendererEvent, callback: () => void): () => void => {
        this.listeners[event].push(callback);
        return () => this.listeners[event].filter(x => x !== callback);
    }

    public addFragment = (fragment: Fragment): void => {
        this.sequence.add(fragment);
        this.emit("fragmentsChanged");
    }

    public play = () => {
        if (this.playTimerId != null) {
            return;
        }
        let prevTimestamp = -1;
        const callback = (timestamp: number) => {
            const nextTimestamp = prevTimestamp === -1 ? this.timestamp : this.timestamp - prevTimestamp + timestamp;
            prevTimestamp = timestamp;
            if (this.setTime(nextTimestamp)) {
                this.playTimerId = requestAnimationFrame(callback)
            }
        }
        requestAnimationFrame(callback);
    }

    public pause = () => {
        if (this.playTimerId != null) {
            cancelAnimationFrame(this.playTimerId);
            this.playTimerId = null;
        }
    }

    public setTime = (timestamp: number): boolean => {
        let success = false;
        if (this.gl != null) {
            success = this.sequence.draw(this.gl, timestamp);
        } else {
            console.warn("WebGl context isn't bound");
        }
        this.timestamp = timestamp;
        this.emit("timestampChanged");
        return success;
    }

    public bindContext = (gl: WebGL2RenderingContext): void => {
        this.gl = gl;
    }

    private emit = (event: RendererEvent): void => {
        this.listeners[event].forEach(x => x(event));
    }
}