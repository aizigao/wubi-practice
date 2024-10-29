export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export function getRootKeyImg(rootKey: string) {
  const [char, idx] = rootKey.split('-')
  return `/root-xsj/${char}/${idx}.png`
}
