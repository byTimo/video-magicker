export function getBoundedValue(value: number, upper: number, lower = 0): number {
    return value < lower ? lower : value > upper ? upper : value;
}

export type ShaderType = "VERTEX_SHADER" | "FRAGMENT_SHADER";

//shader provider ??
export function compileShader(
    gl: WebGL2RenderingContext,
    shaderSource: string,
    shaderType: ShaderType,
): WebGLShader {
    const shader = gl.createShader(gl[shaderType]);
    if (shader == null) {
        throw new Error(`Could not create shader ${shaderType}`);
    }
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);
    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
        throw new Error(`Could not compile shader: ${gl.getShaderInfoLog(shader)}`);
    }
    return shader;
}

export function createShaderProgram(
    gl: WebGL2RenderingContext,
    vertexShader: WebGLShader,
    fragmentShader: WebGLShader
): WebGLProgram {
    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error("Can't link shanders program");
    }
    return program;
}

export function createElementTexture(
    gl: WebGL2RenderingContext,
    width: number,
    height: number
): WebGLTexture {
    const texture = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        width,
        height,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        null,
    );

    return texture;
}

export function createTextureFramebuffer(
    gl: WebGL2RenderingContext,
    texture: WebGLTexture,
): WebGLFramebuffer {
    const framebuffer = gl.createFramebuffer()!;
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        texture,
        0
    );
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    return framebuffer;
}

export function updateTexture(
    gl: WebGL2RenderingContext,
    texture: WebGLTexture,
    data: any
): void {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
}