import { Message, Registry } from '@bufbuild/protobuf';
import React, { useContext } from 'react';
import { ProtobufVizTheme } from './theme.ts';

export interface CustomRenderProps<N extends Message = Message> {
  msg: N;
  rootMsg: Message;
  theme: ProtobufVizTheme;
  isNested: boolean;
}

export interface RenderConfig {
  nodeRender?: (props: CustomRenderProps) => React.ReactNode | undefined;
  edgesFromFields?: boolean;
}

interface PrivateRenderConfig {
  registry?: Registry;
  rootMsg: Message;
}

// Create the context with a default value
export const RenderConfigContext = React.createContext(
  {} as RenderConfig & PrivateRenderConfig,
);

export function useRenderConfig() {
  return useContext(RenderConfigContext);
}
