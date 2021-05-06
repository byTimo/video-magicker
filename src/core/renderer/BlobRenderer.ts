import {Sequence} from "./Sequence";

declare global {
    interface HTMLCanvasElement {
        captureStream(frameRequestRate?: number): MediaStream;
    }
}

export class BlobRenderer {
    private readonly canvas: HTMLCanvasElement;

    constructor(private sequence: Sequence, private fps: number) {
        this.canvas = document.createElement("canvas");
        this.canvas.height = 256;
        this.canvas.width = 256;
        this.canvas.hidden = true;
        document.body.appendChild(this.canvas);
    }

    public render = async (): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const data: Blob[] = [];
            const gl = this.canvas.getContext("webgl2")!;
            const stream = this.canvas.captureStream();
            const recorder = new MediaRecorder(stream, {mimeType: 'video/webm'});
            recorder.ondataavailable = event => {
                data.push(event.data);
                console.log("data recorded", event.data.size, event.timecode);
            };
            recorder.onstart = () => console.log("Recording was started");
            recorder.onstop = () => {
                console.log("Recording was stopped")
                const blob = new Blob(data, {type: 'video/webm'});
                resolve(blob);
            }

            recorder.onerror = e => reject(e.error);

            const frameTime = 1000 / this.fps;
            let timestamp = 0;
            this.sequence.draw(gl, timestamp);
            const id = setInterval(() => {
                timestamp += frameTime;
                if (!this.sequence.draw(gl, timestamp)) {
                    clearInterval(id);
                    recorder.stop();
                }
            }, frameTime);
            recorder.start(frameTime);
        })
    }

    private saveFile = (blob: Blob, filename: string): void => {
        const a = document.createElement("a");
        document.body.appendChild(a);
        const url = URL.createObjectURL(blob);
        a.href = url;
        a.download = filename;
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        })
    }
}