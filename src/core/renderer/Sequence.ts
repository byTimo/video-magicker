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

    public prevTimestamp: number = 0;
    private prevNode: SequenceNode | null = null;

    public add = (fragment: Fragment): void => {
        if (this.front == null) {
            this.front = new SequenceNode(fragment);
            this.tail = this.front;
            this.prevNode = this.front;
        } else {
            const node = new SequenceNode(fragment, this.tail);
            this.tail!.next = node;
            this.tail = node;
        }
    }

    public draw = (gl: WebGL2RenderingContext, timestamp: number): boolean => {
        if (this.prevNode == null) {
            console.warn("Drawing sequence is empty");
            return false;
        }

        let direction: "next" | "prev" = timestamp - this.prevTimestamp > 0 ? "next" : "prev";
        for (let current = this.prevNode; current != null; current = current[direction]!) {
            if (current.from <= timestamp && current.to > timestamp) {
                const local = timestamp - current.from;
                current.fragment.source.draw(gl, local);
                this.prevNode = current;
                this.prevTimestamp = timestamp;
                return true;
            }
        }

        return false;
    }

    public map = <R>(mapper: (x: SequenceNode, i: number) => R): R[] => {
        const result: R[] = [];
        for (let current = this.front, i = 0; current != null; current = current.next, i++) {
            result.push(mapper(current, i));
        }
        return result;
    }
}
