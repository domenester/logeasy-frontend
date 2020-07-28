import React from 'react';
import ProviderGenerator from '../shared/provider-generator'
import { buildLogKey } from '../utils/log.utils';
import { LogStateProvider, useLogStateValue } from '../shared/state-handler/logs'

interface ILog {
  stream: string,
  name: string,
  messages: string []
}

export type TDataHashed = { [key: string]: string[] }

const useBuildValue = () => {
  const { state, dispatch } = useLogStateValue()

  const handleLogs = (logs: ILog[]) => {
    const logsHashed: TDataHashed = {}
    logs.forEach( ({stream, name, messages}) => {
      if (!logsHashed[buildLogKey(stream, name)]) {
        logsHashed[buildLogKey(stream, name)] = messages
      }
    })
    dispatch({type: 'setLogs', payload: logsHashed})
  }

  return {
    handleLogs
  }
}

const providerGenerated = ProviderGenerator( useBuildValue )

const LogServiceProviderGenerated = providerGenerated.provider
const LogServiceContext = providerGenerated.context
const useLogServiceValue = providerGenerated.useValue

const LogServiceProvider = ({ children }: any) => {
  return (
    <LogStateProvider>
      <LogServiceProviderGenerated>
        {children}
      </LogServiceProviderGenerated>
    </LogStateProvider>
  )
}

export {
  LogServiceProvider,
  LogServiceContext,
  useLogServiceValue
};