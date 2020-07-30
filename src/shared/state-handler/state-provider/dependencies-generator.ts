import { useReducer } from 'react';
import ProviderGenerator from '../../provider-generator';
import { reducerHandler } from '../state-provider/reducer-handler';
import { IContextProps } from '../interfaces';

export function DependenciesGenerator<ReducerType, StateType> (
  reducers: ReducerType,
  initialState: () => StateType
) {

  const reducer = (state: StateType, action: {
    type: string, payload: unknown
  }) => {
    return reducerHandler(state, action, reducers)
  };
  
  const buildValue = (): IContextProps<StateType> => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [state, dispatch] = useReducer(reducer, initialState());
    return { state, dispatch };
  }
  
  const providerGenerated = ProviderGenerator(
    buildValue,
    {}
  )
  
  const stateProvider = providerGenerated.provider;
  const context = providerGenerated.context;
  const stateValue = providerGenerated.useValue;
  
  return {
    stateProvider,
    context,
    stateValue
  }
}