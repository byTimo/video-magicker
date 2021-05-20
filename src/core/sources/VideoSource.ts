import {getBoundedValue} from '../utils';
import {Source} from "./Source";
import createRegl, {DefaultContext, DrawCommand, Texture2D} from "regl";
import vert from "../glsl/texture2d.vert";
import frag from "../glsl/texture2d.frag";

interface ImageCommandProps {
    texture: Texture2D;
}

export class VideoSource implements Source {
    private command: DrawCommand<DefaultContext, ImageCommandProps> | null = null;
    private texture: Texture2D | null = null;

    constructor(public id: string, public name: string, private video: HTMLVideoElement) {
    }

    draw(gl: WebGL2RenderingContext, timestamp: number): void {
        console.log(timestamp, this.video.duration, this.video.currentTime);
        if (this.command == null || this.texture == null) {
            const regl = createRegl(gl);
            this.texture = regl.texture({
                data: this.video,
            });
            this.command = regl({
                vert,
                frag,
                attributes: {
                    "a_position": [[-1, -1], [-1, 1], [1, -1], [1, 1]],
                    "a_texturePosition": [[0, 0], [0, -1], [1, 0], [1, -1]],
                },
                uniforms: {
                    "u_texture": regl.prop<ImageCommandProps, "texture">("texture"),
                },
                count: 4,
                primitive: "triangle strip",
            });
        }
        this.video.currentTime = getBoundedValue(timestamp / 1000, this.video.duration);
        this.texture(this.video)
        this.command({
            texture: this.texture,
        });
    }
}