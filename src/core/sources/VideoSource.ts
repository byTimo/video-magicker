import { getBoundedValue } from '../utils';
type SourceState = "awaiting" | "stop" | "error";


export class VideoSource {
    private loading: Promise<void>;

    public readonly source: HTMLVideoElement;
    public readonly filename: string;
    public readonly type: string;
    public readonly size: number;
    public state: SourceState = "awaiting";

    constructor(file: File) {
        const url = URL.createObjectURL(file);
        this.filename = file.name;
        this.type = file.type;
        this.size = file.size;
        this.source = document.createElement("video");
        this.source.src = url;


        this.loading = new Promise((resolve, reject) => {
            this.source.addEventListener(
                "canplaythrough",
                () => {
                    this.state = "stop";
                    resolve();
                },
                { once: true }
            );

            this.source.addEventListener(
                "error",
                e => {
                    this.state = "error";
                    reject(e);
                },
                { once: true }
            )
        })
    }

    public get awaiter(): Promise<void> {
        return this.awaiter;
    }

    public get duration(): number {
        return this.source.duration;
    }

    public seek(value: number) {
        if (this.state === "awaiting" || this.state === "error") {
            return;
        }
        this.source.currentTime = getBoundedValue(value, this.duration);
    }

    public get data() {
        if (this.state == "awaiting" || this.state === "error") {
            return null;
        }
        return this.source;
    }
}