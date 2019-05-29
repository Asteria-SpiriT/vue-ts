const filters: any = {
  parseSex: (value: number): string => {
    const str: string = '' + value
    return str === '1' ? '男' : str === '0' ? '女' : ''
  },
}

export default filters
