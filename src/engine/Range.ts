
class Range {

  public static rowRange(rowNumber: number, colCount: number): [number, number][] {
    return Array.from(new Array(colCount), (x, i) => [i, rowNumber])
  }
  
}

export default Range
