import { sum } from "./sum"

export const avg = (values: number[]) => {
    return +(sum(values) / values.length).toFixed(2)
}