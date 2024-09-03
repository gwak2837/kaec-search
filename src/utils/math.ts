export function filterDuplicatedObject<T>(objects: T, keys: string[]) {
  if (!objects) return

  const seen = new Set()

  return (objects as Record<string, unknown>[]).filter((item) => {
    const key = keys.map((k) => item[k]).join('|') // 각 객체를 식별할 수 있는 문자열 생성

    if (seen.has(key)) {
      return false // 이미 존재하는 객체는 필터링
    } else {
      seen.add(key) // 새로운 객체는 추가
      return true
    }
  }) as T
}
