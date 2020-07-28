export function reducerHandler <StateType> (
  state: StateType,
  action: {
    type: string, payload: any
  },
  reducers: { [key: string ]: any }
) {
  if (!reducers[action.type]) {
    throw new Error(`Action type '${action.type}' not registered in reducers.`)
  }
  return reducers[action.type](state, action.payload)
};