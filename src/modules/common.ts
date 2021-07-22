interface IMenuBasic {
    title: string;
    key: string;
    icon: string;
    isPublic?: Boolean;
}
export interface IMenu extends IMenuBasic {
    children?: Array<IMenuBasic>;
    link?: string;
}
