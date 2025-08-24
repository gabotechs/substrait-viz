export function downloadBlob(name: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = name
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function enforceExtension(name: string, ext: string): string {
  const components = name.split('.');
  components.pop()
  components.push(ext)
  return components.join('.');
}