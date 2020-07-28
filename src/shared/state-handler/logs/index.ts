import LogInitialState from './initial-state'
import { LogReducers } from './reducers'
import { DependenciesGenerator } from '../state-provider';

const { stateProvider, context, stateValue } = DependenciesGenerator(
  LogReducers,
  LogInitialState
)

export const LogStateProvider = stateProvider
export const LogContext = context
export const useLogStateValue = stateValue
