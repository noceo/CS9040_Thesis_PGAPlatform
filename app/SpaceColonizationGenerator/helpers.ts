export type Vertex = [number, number, number]

export function randomPointsInCube(
  amount: number,
  sideLength: number = 100
): Array<Vertex> {
  const points: Array<Vertex> = []
  const min = -(sideLength / 2)
  const max = sideLength / 2
  for (let i = 0; i < amount; i++) {
    const x = Math.round(Math.random() * (max - min) + min)
    const y = Math.round(Math.random() * (max - min) + min)
    const z = Math.round(Math.random() * (max - min) + min)
    points.push([x, y, z])
  }
  return points
}

export function randomPointsInSphere(
  amount: number,
  radius: number
): Array<Vertex> {
  let x: number, y: number, z: number
  const min = -radius
  const max = radius
  const points: Array<Vertex> = []
  for (let i = 0; i < amount; i++) {
    do {
      x = Math.round(Math.random() * (max - min) + min)
      y = Math.round(Math.random() * (max - min) + min)
      z = Math.round(Math.random() * (max - min) + min)
    } while (x ** 2 + y ** 2 + z ** 2 > radius ** 2)
    points.push([x, y, z])
  }
  return points
}
