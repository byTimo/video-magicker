import frag from "./main.frag";
import vert from "./main.vert";
import { compileShader, createShaderProgram, createElementTexture, createTextureFramebuffer, updateTexture } from '../utils';

/**
 * Renderer
 * |
 * \-- fragments[] - ordered collection of rendering items
 * (?) - what about tree-like structure that can get all framents by timestamp
 * 
 */

export class Destination {
    private readonly vertexShader: WebGLShader;
    private readonly fragmentShader: WebGLShader;
    private readonly program: WebGLProgram;
    private readonly texture: WebGLTexture;
    private readonly framebuffer: WebGLFramebuffer;

    constructor(private readonly gl: WebGL2RenderingContext, width: number, height: number) {
        this.vertexShader = compileShader(gl, vert, "VERTEX_SHADER");
        this.fragmentShader = compileShader(gl, frag, "FRAGMENT_SHADER");
        this.program = createShaderProgram(gl, this.vertexShader, this.fragmentShader);
        this.texture = createElementTexture(gl, width, height);
        this.framebuffer = createTextureFramebuffer(gl, this.texture);

        const positionLocation = gl.getAttribLocation(this.program, "a_position");
        const buffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0]),
            gl.STATIC_DRAW
        );

        const texCoordLocation = gl.getAttribLocation(this.program, "a_texCoord");
        gl.enableVertexAttribArray(texCoordLocation);
        gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0]),
            gl.STATIC_DRAW,
        )
    }

    destroy() {
        this.gl.detachShader(this.program, this.vertexShader);
        this.gl.detachShader(this.program, this.fragmentShader);
        this.gl.deleteShader(this.vertexShader);
        this.gl.deleteShader(this.fragmentShader);
        this.gl.deleteProgram(this.program);
        this.gl.deleteTexture(this.texture);
        this.gl.deleteFramebuffer(this.framebuffer);
    }

    render(data: any) {
        if(data == null) {
            return;
        }
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.gl.useProgram(this.program);
        updateTexture(this.gl, this.texture, data);

        // real render;
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }
}




export class Renderer {
    constructor() {
    }
}