export default function getKey(date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}
