import {getBoundedValue} from '../utils';
import {Source} from "../sources/Source";

export class Fragment {
    private _from: number;
    private _to: number;
    private maxDuration: number | null;

    constructor(public readonly source: Source, from?: number, to?: number) {
        // this.maxDuration = "duration" in source ? source.duration : null;
        this.maxDuration = null;
        this._from = from ?? 0;
        this._to = to ?? this.maxDuration ?? 5 * 1000; //ms
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
}