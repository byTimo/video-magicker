import createRegl, {DefaultContext, DrawCommand} from "regl";
import frag from "../glsl/rgbColor.frag";
import vert from "../glsl/translated2dScreen.vert";

interface ColorCommandProps {
    color: [number, number, number],
}

export class ColorSource {
    private command: DrawCommand<DefaultContext, ColorCommandProps> | null = null;
    private color!: ColorCommandProps["color"];

    constructor(red: number, green: number, blue: number) {
        this.setColor(red, green, blue);
    }

    draw(gl: WebGL2RenderingContext, _ : number): void {
        if (this.command == null) {
            const regl = createRegl(gl);
            this.command = regl({
                vert,
                frag,
                attributes: {
                    "a_position": [[1.0, 1.0], [0.0, 1.0], [1.0, 0.0], [1.0, 0.0], [0.0, 1.0], [0.0, 0.0]]
                },
                uniforms: {
                    "u_color": regl.prop<ColorCommandProps, "color">("color")
                },
                count: 6,
            })
        }
        this.command({
            color: this.color
        });
    }

    setColor(red: number, green: number, blue: number) {
        this.color = [red / 255, green / 255, blue / 255];
    }
}