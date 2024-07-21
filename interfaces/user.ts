export interface User {
  name: string
  age: number
  height: number
  weight: number
  sex: 'masculine' | 'feminine'
}

export interface CreateUser {
  id?: string
  session_id: string
  name: string
  age: number
  height: number
  weight: number
  sex: 'masculine' | 'feminine'
}
