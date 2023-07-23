export interface Position {
    lng: string 
    lat: string 
    adcode: string 
    city: string
}

export async function getLocation(): Promise<Position> {
    const position = {
      lng: '', // 经度
      lat: '', // 纬度
      adcode: '', // 城市编码
      city: '' // 城市名
    }
    return position
  }