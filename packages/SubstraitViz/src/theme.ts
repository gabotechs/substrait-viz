import {
  defaultTheme as protobufVizDefaultTheme,
  ProtobufVizTheme,
} from '@protobuf-viz/react';

export const defaultTheme = {
  fieldRef: '#4996e7',
  function: '#ffa600',
  ...protobufVizDefaultTheme,
};

export type SubstraitVizTheme = typeof defaultTheme & ProtobufVizTheme;
