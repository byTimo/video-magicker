import {getBoundedValue} from '../utils';
import {ColorSource} from "../sources/ColorSource";

export class Fragment {
    private _from: number;
    private _to: number;
    private maxDuration: number | null;

    constructor(public readonly source: ColorSource) {
        // this.maxDuration = "duration" in source ? source.duration : null;
        this.maxDuration = null;
        this._from = 0;
        this._to = this.maxDuration ?? 5 * 1000; //ms
    }

    public get from(): number {
        return this._from;
    }

    public set from(value: number) {
        this._from = getBoundedValue(value, this.to);
    }

    public get to(): number {
        return this._to;
    }

    public set to(value: number) {
        this._to = getBoundedValue(value, this.maxDuration ?? Infinity, this.from);
    }

    public get duration(): number {
        return this._to - this._from;
    }

    public seek(value: number) {
        value = getBoundedValue(value, this.to, this.from);
        this.source.seek(value);
    }
}