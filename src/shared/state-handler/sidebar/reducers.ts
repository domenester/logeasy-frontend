import { TReducers } from "../interfaces"

export const SidebarReducers: TReducers =  {
  setSelectedStreamAndName: (state: any, payload: string) => ({
      ...state,
      selectedStreamAndName: payload
    }
  )
}
