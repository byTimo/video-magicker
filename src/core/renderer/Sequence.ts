import {Fragment} from "./Fragment";

class SequenceNode {
    public from: number;
    public to: number;

    constructor(
        public readonly fragment: Fragment,
        public prev: SequenceNode | null = null,
        public next: SequenceNode | null = null,
    ) {
        this.from = prev?.to ?? 0;
        this.to = fragment.duration + (prev?.to ?? 0);
    }
}

export class Sequence {
    public front: SequenceNode | null = null;
    public tail: SequenceNode | null = null;

    private activeTime: number = 0;
    private activeNode: SequenceNode | null = null;

    public add = (fragment: Fragment): void => {
        if (this.front == null) {
            this.front = new SequenceNode(fragment);
            this.tail = this.front;
        } else {
            const node = new SequenceNode(fragment, this.tail);
            this.tail!.next = node;
            this.tail = node;
        }
    }

    public setTime = (time: number): boolean => {
        if (this.activeNode == null) {
            this.activeNode = this.researchActiveNode(time);
            this.activeTime = this.activeNode != null ? time : 0;
            return this.activeNode != null;
        }
        let direction: "next" | "prev" = time - this.activeTime > 0 ? "next" : "prev";
        for (let current = this.activeNode; current != null; current = current[direction]!) {
            if (current.from <= time && current.to > time) {
                this.activeNode = current;
                this.activeTime = time;
                return true;
            }
        }

        this.activeNode = null;
        this.activeTime = 0;
        return false;
    }

    public draw = (gl: WebGL2RenderingContext): void => {
        if (this.activeNode == null) {
            this.activeNode = this.researchActiveNode(this.activeTime);
        }

        const local = this.activeTime - (this.activeNode?.from ?? 0);
        this.activeNode?.fragment.source.draw(gl, local);
    }

    private researchActiveNode = (time: number): SequenceNode | null => {
        for (let current = this.front; current != null; current = current!.next) {
            if (current.from <= time && current.to > time) {
                return current;
            }
        }
        return null;
    }
}
