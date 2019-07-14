export async function root (key?: string): Promise<string> {
  return key || 'spring has sprung!!!'
}
