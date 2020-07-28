import React, { createContext, useContext } from 'react';

interface IProviderGenerator<HookType> {
  context: React.Context<any>;
  provider: ({ children }: any) => JSX.Element;
  useValue: () => HookType
}

export default function ProviderGenerator<HookType>(
  buildValue: () => HookType,
  contextDefaultValue = {} as any,
): IProviderGenerator<HookType> {
  const context = createContext(contextDefaultValue);
  const provider = ({ children }: any) => (
    <context.Provider value={buildValue()}>
      {children}
    </context.Provider>
  )
  const useValue = () => useContext(context);
  return {
    context,
    provider,
    useValue
  }
}