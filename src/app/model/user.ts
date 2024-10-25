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

export interface RepoRetail {
    userId: string | any;
    userName: string | any;
    totalCommits: number;
    totalPullRequest: number;
    totalIssues: number;
  }

  export interface IOrganization {
    login: string
    id: number
    node_id: string
    url: string
    repos_url: string
    events_url: string
    hooks_url: string
    issues_url: string
    members_url: string
    public_members_url: string
    avatar_url: string
    description: any
  }