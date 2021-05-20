attribute vec2 a_position;
attribute vec2 a_texturePosition;

varying highp vec2 v_texturePosition;

void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texturePosition = (a_position + 1.0)/2.0;
}