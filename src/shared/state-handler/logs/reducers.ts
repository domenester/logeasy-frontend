import { TReducers } from "../interfaces"

export const LogReducers: TReducers =  {
  setLogs: (state: any, payload: any) => {
    return {
      ...state,
      ...payload
    }
  }
}
