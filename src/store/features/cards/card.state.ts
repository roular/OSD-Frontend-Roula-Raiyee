export enum IMPORTANCE {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High'
}

export enum LISTTYPE {
    toDo = 'ToDo',
    doing = 'Doing',
    done = 'Done'
};

export type ItemType = {
    id: string
    description: string;
    category: string;
    dueDate: string;
    estimate: string;
    importance: IMPORTANCE
}

export type ItemListType = {
    id: string
    name: string;
    items: ItemType[]
}


export type CardState = {
    [list in LISTTYPE]: ItemListType
}

export interface CardResponseItem  {
    cardID: number;
    cardTitle: string;
    cardCategory: string;
    cardDuedate: string;
    cardEstimate: string;
    cardImportance: string;
    cardType: LISTTYPE;
    personid: number;
}

export type CardResponseModel = CardResponseItem[]