export interface AppTool {
    app_id: string;
    name: string;
    color: string;
    icon: string;
    link: string;
}

export type HistoryItem = Pick<AppTool, 'app_id' | 'name' | 'color' | 'icon' | 'link'>;