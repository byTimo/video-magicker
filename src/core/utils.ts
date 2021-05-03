export function getBoundedValue(value: number, upper: number, lower = 0): number {
    return value < lower ? lower : value > upper ? upper : value;
}