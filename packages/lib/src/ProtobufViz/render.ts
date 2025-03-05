import React, { useContext } from 'react';
import { Message } from '@bufbuild/protobuf';
import { ProtobufVizTheme } from './theme.ts';

export interface CustomRenderProps<N extends Message = Message> {
  msg: N;
  theme: ProtobufVizTheme;
  isNested: boolean;
}

export interface RenderConfig {
  renderField?: (props: CustomRenderProps) => React.ReactNode | undefined;
  edgesFromFields?: boolean;
}

// Create the context with a default value
export const RenderConfigContext = React.createContext<RenderConfig>({});

export function useRenderConfig() {
  return useContext(RenderConfigContext);
}
