export default function objectReducer(key) {
  return (acc, curr) => {
    acc[curr[key]] = curr

    return acc
  }
}
