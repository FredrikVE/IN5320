//src/utils/checkInput.js
export function checkInput(raw, items) {
  const q = String(raw || "").trim()
  if (!q) {
    const err = new Error("EMPTY")
    err.kind = "empty"
    throw err
  }
  const exists = (items || []).some(
    (c) => c.name.toLowerCase() === q.toLowerCase()
  )
  if (exists) {
    const err = new Error("DUPLICATE")
    err.kind = "duplicate"
    throw err
  }
  return q
}
