type TAspectDimensionsProps = {
  size: number;
  originalWidth: number;
  originalHeight: number;
};

export function aspectDimensions({
  size,
  originalWidth,
  originalHeight,
}: TAspectDimensionsProps): number {
  return (size / originalWidth) * originalHeight;
}
