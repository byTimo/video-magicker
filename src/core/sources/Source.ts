export interface Source {
    id: string;
    name: string;
    draw: (gl: WebGL2RenderingContext, timestamp: number) => void;
}