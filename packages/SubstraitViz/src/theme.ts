import {
  defaultTheme as protobufVizDefaultTheme,
  ProtobufVizTheme,
} from '@protobuf-viz/react';

export const defaultTheme = {
  type: '#ee52a5',
  literal: '#75bf6c',
  fieldRef: '#4996e7',
  function: '#eca91f',
  ...protobufVizDefaultTheme,
};

export type SubstraitVizTheme = typeof defaultTheme & ProtobufVizTheme;
