import { Source } from "../sources";
import { getBoundedValue } from '../utils';

export class Fragment {
    private _from: number;
    public _to: number;

    constructor(private readonly source: Source) {
        this._from = 0;
        this._to = source.duration;
    }

    public get from(): number {
        return this._from;
    }

    public set from(value: number) {
        this._from = getBoundedValue(value, this.source.duration);
    }

    public get to(): number {
        return this._to;
    }

    public set to(value: number) {
        this._to = getBoundedValue(value, this.source.duration);
    }

    public seek(value: number) {
        value = getBoundedValue(value, this.to, this.from);
        this.source.seek(value);
    }
}