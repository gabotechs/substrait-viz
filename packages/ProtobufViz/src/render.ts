import { Message, Registry } from '@bufbuild/protobuf';
import React, { useContext } from 'react';
import { ProtobufVizTheme } from './theme.ts';

export interface CustomRenderProps<N extends Message = Message> {
  msg: N;
  theme: ProtobufVizTheme;
  isNested: boolean;
}

export interface RenderConfig {
  nodeRender?: (props: CustomRenderProps) => React.ReactNode | undefined;
  edgesFromFields?: boolean;
}

interface PrivateRenderConfig {
  registry?: Registry;
}

// Create the context with a default value
export const RenderConfigContext = React.createContext<
  RenderConfig & PrivateRenderConfig
>({});

export function useRenderConfig() {
  return useContext(RenderConfigContext);
}
