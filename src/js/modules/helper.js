export function rowColToArrayIndex(col, row, brickCols) {
  return col + brickCols * row;
}