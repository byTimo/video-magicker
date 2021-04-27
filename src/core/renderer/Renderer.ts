import frag from "../glsl/rgbColor.frag";
import vert from "../glsl/translated2dScreen.vert";
import {compileShader, createElementTexture, createShaderProgram, createTextureFramebuffer} from '../utils';
import {Fragment} from "./Fragment";

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

    private readonly colorLocation: WebGLUniformLocation;

    constructor(private readonly gl: WebGL2RenderingContext, width: number, height: number) {
        this.vertexShader = compileShader(gl, vert, "VERTEX_SHADER");
        this.fragmentShader = compileShader(gl, frag, "FRAGMENT_SHADER");
        this.program = createShaderProgram(gl, this.vertexShader, this.fragmentShader);
        this.texture = createElementTexture(gl, width, height);
        this.framebuffer = createTextureFramebuffer(gl, this.texture);

        const positionLocation = gl.getAttribLocation(this.program, "a_position");
        const positionBuffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0]),
            gl.STATIC_DRAW
        );
        gl.enableVertexAttribArray(positionLocation);
        /* bind positionLocation to active gl.ARRAY_BUFFER */
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        // const texCoordLocation = gl.getAttribLocation(this.program, "a_texCoord");
        // gl.enableVertexAttribArray(texCoordLocation);
        // gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);
        // gl.bufferData(
        //     gl.ARRAY_BUFFER,
        //     new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0]),
        //     gl.STATIC_DRAW,
        // )

        this.colorLocation = gl.getUniformLocation(this.program, "u_color")!;
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

    render(red: number, green: number, blue: number) {
        this.clear();
        this.gl.useProgram(this.program);
        this.gl.uniform3f(this.colorLocation, red, green, blue);
        // updateTexture(this.gl, this.texture, data);
        // real render;
        // this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }

    private clear() {
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
}

export class Renderer {
    private fragments: Map<number, Fragment> = new Map();
    private timerId: number | null = null;

    private lastTime = 0;

    private id = 0;

    constructor(private gl: WebGL2RenderingContext) {
    }

    addFragment(fragment: Fragment) {
        this.fragments.set(this.lastTime, fragment);
        this.lastTime = this.lastTime + fragment.to;
    }

    public play() {
        const start = performance.now();
        this.stop();
        console.log(this.fragments);
        const _play = (currentTime: number) => {
            const time = currentTime - start;
            let currentFragment = this.getFragmentOrError(this.id);
            console.log("id", this.id, "to", currentFragment.to, "time", time);

            if(currentFragment.to + this.id <= time) {
                this.id += currentFragment.to;
                currentFragment = this.getFragmentOrError(this.id);
            }
            currentFragment.source.draw(this.gl, time - currentFragment.to);
            this.timerId = requestAnimationFrame(_play);
        }

        _play(start + 1);
    }

    private getFragmentOrError(id: number): Fragment {
        let currentFragment = this.fragments.get(id);
        if(currentFragment == null) {
            throw new Error(`Can't find fragment with id ${id}`);
        }
        return currentFragment;
    }

    public stop() {
        if (this.timerId != null) {
            cancelAnimationFrame(this.timerId)
        }
    }
}