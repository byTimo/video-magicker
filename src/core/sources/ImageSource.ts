import {Source} from "./Source";

export class ImageSource implements Source {
    constructor(public id: string, public name: string) {

    }

    draw(gl: WebGL2RenderingContext, timestamp: number): void {
    }
}