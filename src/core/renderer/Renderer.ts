import {Sequence} from "./Sequence";
import {Fragment} from "./Fragment";

export type Event = "fragments" | "time";
export type Listener = (event: Event) => void;

export class Renderer {
    public readonly sequence = new Sequence();
    public current: number = 0;

    private listeners: Array<Listener> = [];
    private renderTimerId: number | null = null;
    private playTimerId: number | null = null;

    constructor(private gl: WebGL2RenderingContext) {
    }

    public addEventListener = (callback: () => void): () => void => {
        this.listeners.push(callback);
        return () => this.listeners.filter(x => x !== callback);
    }

    public addFragment = (fragment: Fragment): void => {
        this.sequence.add(fragment);
        this.emit("fragments");
    }

    public startRender = (): void => {
        if (this.renderTimerId == null) {
            const callback = () => {
                this.sequence.draw(this.gl);
                this.renderTimerId = requestAnimationFrame(callback);
            }
            callback();
        }
    }

    public stopRender = (): void => {
        if (this.renderTimerId != null) {
            cancelAnimationFrame(this.renderTimerId);
            this.renderTimerId = null;
        }
    }

    public play = () => {
        if (this.playTimerId != null) {
            return;
        }

        const startTime = this.current;
        const startTimestamp = performance.now();
        const callback = (timestamp: number) => {
            const diff = timestamp - startTimestamp;
            const success = this.setTime(startTime + diff);
            if (success) {
                this.playTimerId = requestAnimationFrame(callback)
            }
        }
        callback(startTimestamp);
    }

    public pause = () => {
        if (this.playTimerId != null) {
            cancelAnimationFrame(this.playTimerId);
            this.playTimerId = null;
        }
    }

    public setTime = (time: number): boolean => {
        this.current = time;
        const success = this.sequence.setTime(time);
        this.emit("time");
        return success;
    }

    private emit = (event: Event): void => {
        this.listeners.forEach(x => x(event));
    }
}