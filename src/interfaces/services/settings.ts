export enum AppAction {
    PushTokenUpdate = 'pushTokenUpdate',
    ForceUpdate = 'forceUpdate',
}

export interface AppSettings {
    minVersion: string | null
    needActions: AppAction[]
}
