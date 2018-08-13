export default function getSessionStorage(key) {
  return JSON.parse(sessionStorage.getItem(key));
}
