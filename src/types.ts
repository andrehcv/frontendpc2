export interface Item {
    id: number;
    title: string;
    author: string;
    category: string;
    availableCopies: number;
    description: string;
}

export interface Detail extends Item {
    totalCopies: number; //extra
}

export interface OperationBody {
    days: number;
}

export interface Operation {
    id: number;
    materialId: number;
    materialTitle: string;
    days: number;
    dueDate: string;
    status: string;
}