export interface Task {
    id: string;
    text: string;
    type: string;
    day: string;
    reminder: boolean;
    createDate: object;
    priority: number;
    status: string;
}