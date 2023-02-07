export interface IUser {
  _id: string
  name: string
  email: string
  avatarUrl: string
}

export interface INote {
  _id: string
  title: string
  content: string
  folder: string
  createdAt: string
}

export interface IFolder {
  _id: string
  name: string
  notes: INote[]
}
