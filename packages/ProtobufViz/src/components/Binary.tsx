export interface BinaryProps {
  data: Uint8Array;
}
export function Binary(props: BinaryProps) {
  return <div>[{props.data.length} bytes]</div>;
}
