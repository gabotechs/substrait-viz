import { Message, Registry } from '@bufbuild/protobuf';
import React, { useContext } from 'react';
import { ProtobufVizTheme } from './theme.ts';

export interface CustomRenderProps<
  N extends Message = Message,
  T extends ProtobufVizTheme = ProtobufVizTheme,
> {
  msg: N;
  rootMsg: Message;
  theme: T;
  isNested: boolean;
}

export type NodeRenderer<T extends ProtobufVizTheme = ProtobufVizTheme> = (
  props: CustomRenderProps<Message, T>,
) => React.ReactNode | undefined;

export interface RenderConfig<T extends ProtobufVizTheme> {
  nodeRender?: NodeRenderer<T>;
  edgesFromFields?: boolean;
}

interface PrivateRenderConfig {
  registry?: Registry;
  rootMsg: Message;
}

// Create the context with a default value
export const RenderConfigContext = React.createContext(
  {} as RenderConfig<ProtobufVizTheme> & PrivateRenderConfig,
);

export function useRenderConfig() {
  return useContext(RenderConfigContext);
}
