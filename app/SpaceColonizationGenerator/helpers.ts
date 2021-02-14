import { Vector3 } from 'three'

export function randomPointsInCube(
  amount: number,
  sideLength: number = 100
): Array<Vector3> {
  const points: Array<Vector3> = []
  const min = -(sideLength / 2)
  const max = sideLength / 2
  for (let i = 0; i < amount; i++) {
    const x = Math.round(Math.random() * (max - min) + min)
    const y = Math.round(Math.random() * (max - min) + min)
    const z = Math.round(Math.random() * (max - min) + min)
    points.push(new Vector3(x, y, z))
  }
  return points
}

export function randomPointsInSphere(
  amount: number,
  radius: number
): Array<Vector3> {
  let x: number, y: number, z: number
  const min = -radius
  const max = radius
  const points: Array<Vector3> = []
  for (let i = 0; i < amount; i++) {
    do {
      x = Math.round(Math.random() * (max - min) + min)
      y = Math.round(Math.random() * (max - min) + min)
      z = Math.round(Math.random() * (max - min) + min)
    } while (x ** 2 + y ** 2 + z ** 2 > radius ** 2)
    points.push(new Vector3(x, y, z))
  }
  return points
}

export function mapParam(
  param: number,
  orgRangeStart: number,
  orgRangeEnd: number,
  destRangeStart: number = 0,
  destRangeEnd: number = 1
): number {
  if (param >= orgRangeStart && param <= orgRangeEnd) {
    const percentage = param / orgRangeEnd
    const destParam =
      destRangeStart + (destRangeEnd - destRangeStart) * percentage
    return destParam
  } else {
    return destRangeEnd
  }
}
