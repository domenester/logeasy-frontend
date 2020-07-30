export const buildLogKey = (stream: string, name: string) => {
  return `${stream.toLowerCase()}-${name.toLowerCase()}`
}