import {Source} from "./Source";
import createRegl, {DefaultContext, DrawCommand, Texture2D} from "regl";
import frag from "../glsl/texture2d.frag";
import vert from "../glsl/texture2d.vert";

interface ImageCommandProps {
    texture: Texture2D;
}

export class ImageSource implements Source {
    private command: DrawCommand<DefaultContext, ImageCommandProps> | null = null;
    private texture: Texture2D | null = null;

    constructor(public id: string, public name: string, private image: HTMLImageElement) {

    }

    draw(gl: WebGL2RenderingContext, timestamp: number): void {
        //TODO (byTimo) what if draw several gl context ?
        if(this.command == null || this.texture == null) {
            const regl = createRegl(gl);
            this.texture = regl.texture({
                data: this.image,
                flipY: true,
                min: "linear",
            });
            this.command = regl({
                vert,
                frag,
                attributes: {
                    "a_position": [[-1, -1], [-1, 1], [1, -1], [1, 1]],
                    "a_texturePosition" : [[0, 0], [0, -1], [1, 0], [1, -1]],
                },
                uniforms: {
                    "u_texture": regl.prop<ImageCommandProps, "texture">("texture"),
                },
                count: 4,
                primitive: "triangle strip",
            });
        }
        this.command({
            texture: this.texture,
        });
    }

}