import React from 'react';
import { useState } from 'react';
import ProviderGenerator from '../shared/provider-generator'
import io from 'socket.io-client'
import { buildLogKey } from '../utils/log.utils';
import { LogStateProvider, useLogStateValue } from '../shared/state-handler/logs';
import { ConfigurationServiceProvider, useConfigurationServiceValue } from './configuration.service';
import { LogServiceProvider, useLogServiceValue } from './log.service';

const socket = io('http://localhost:3666')

interface IConfig {
  stream: string,
  name: string,
  path: string
}

interface ILog {
  stream: string,
  name: string,
  messages: string []
}

export interface IOnAppend {
  stream: string,
  name: string,
  message: string
}

export type TDataHashed = { [key: string]: string[] }

const useBuildValue = () => {
  const [ connected, setConnected ] = useState(false)
  const { handleConfigs } = useConfigurationServiceValue()
  const { handleLogs } = useLogServiceValue()

  if (!connected) {
    socket.on('connected', ({ configs, logs }: { configs: IConfig[], logs: ILog[]}) => {
      handleConfigs(configs)
      handleLogs(logs)
      setConnected(true)
    });
  }

  const onAppend = (onAppendHandler: (params: IOnAppend) => void) => {
    socket.on('append', onAppendHandler);
  }

  const offAppend = (onAppendHandler?: any) => {
    socket.off('append', onAppendHandler);
  }

  return {
    onAppend,
    offAppend
  }
}

const providerGenerated = ProviderGenerator( useBuildValue )

const SocketServiceProviderGenerated = providerGenerated.provider
const SocketServiceContext = providerGenerated.context
const useSocketServiceValue = providerGenerated.useValue

const SocketServiceProvider = ({ children }: any) => {
  return (
    <ConfigurationServiceProvider>
      <LogServiceProvider>
        <SocketServiceProviderGenerated>
          {children}
        </SocketServiceProviderGenerated>
      </LogServiceProvider>
    </ConfigurationServiceProvider>
  )
}

export {
  SocketServiceProvider,
  SocketServiceContext,
  useSocketServiceValue
};