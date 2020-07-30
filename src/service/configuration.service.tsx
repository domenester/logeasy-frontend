import { useState } from 'react'
import ProviderGenerator from '../shared/provider-generator'

interface IConfig {
  stream: string,
  name: string,
  path: string
}

export type TDataHashed = { [key: string]: string[] }

const useBuildValue = () => {
  const [ configs, setConfigs ] = useState({} as TDataHashed)

  const handleConfigs = (configs: IConfig[]) => {
    const configsHashed: TDataHashed = {}
    configs.forEach( config => {
      if (!configsHashed[config.stream]) { configsHashed[config.stream] = [config.name]}
      else configsHashed[config.stream].push(config.name)
    })
    setConfigs(configsHashed)
  }

  return {
    configs,
    handleConfigs
  }
}

const providerGenerated = ProviderGenerator( useBuildValue )

const ConfigurationServiceProvider = providerGenerated.provider
const ConfigurationServiceContext = providerGenerated.context
const useConfigurationServiceValue = providerGenerated.useValue

export {
  ConfigurationServiceProvider,
  ConfigurationServiceContext,
  useConfigurationServiceValue
};