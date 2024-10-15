export interface IConnectedUser {
    message: string
    data: IUser
    accessToken: string
}

export interface IUser {
    _id: string
    id: number
    avatar_url: string
    login: string
    name: string
    type: string
    accessToken: string
    created_at: string
    __v: number
}