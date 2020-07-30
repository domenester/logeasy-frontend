import React from 'react';
import ProviderGenerator from '../shared/provider-generator'
import { buildLogKey } from '../utils/log.utils';
import { LogStateProvider, useLogStateValue } from '../shared/state-handler/logs'

export interface ILogMetadata {
  severity: string
  message: string
  date: Date
}

export interface ILog {
  stream: string,
  name: string,
  logs: ILogMetadata[]
}

export type TLogMetadataHashed = { [key: string]: ILogMetadata[] }
export type TDataHashed = { [key: string]: string[] }

const useBuildValue = () => {
  const { dispatch } = useLogStateValue()

  const handleLogs = (logs: ILog[]) => {
    const logsHashed: TLogMetadataHashed = {}
    logs.forEach( ({stream, name, logs}) => {
      if (!logsHashed[buildLogKey(stream, name)]) {
        logsHashed[buildLogKey(stream, name)] = logs
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