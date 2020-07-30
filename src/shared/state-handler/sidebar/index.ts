import SidebarInitialState from './initial-state'
import { SidebarReducers } from './reducers'
import { DependenciesGenerator } from '../state-provider';

const { stateProvider, context, stateValue } = DependenciesGenerator(
  SidebarReducers,
  SidebarInitialState
)

export const SidebarStateProvider = stateProvider
export const SidebarContext = context
export const useSidebarStateValue = stateValue
