import {Sequence} from "./Sequence";

export class Renderer {
    public sequence = new Sequence();
    private current: number = 0;

    private renderTimerId: number | null = null;
    private playTimerId: number | null = null;

    constructor(private gl: WebGL2RenderingContext) {
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

        const startPlayTime = performance.now();
        const callback = (offset: number) => {
            this.current = offset - startPlayTime;
            const success = this.sequence.setTime(this.current);
            if (success) {
                this.playTimerId = requestAnimationFrame(callback)
            }
        }
        callback(startPlayTime);
    }

    public pause = () => {
        if (this.playTimerId != null) {
            cancelAnimationFrame(this.playTimerId);
            this.playTimerId = null;
        }
    }

    public reset = () => {
        this.sequence.reset();
    }
}