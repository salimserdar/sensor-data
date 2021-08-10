export interface IData {
    id?: number | undefined;
    name?: string | undefined;
    type?: string | undefined;
    createdAt?: string | undefined;
    units?: string | undefined;
    time: string;
    sensorId: number;
    value: number;
}