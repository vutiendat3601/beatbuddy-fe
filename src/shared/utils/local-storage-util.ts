function saveObject(key: string, obj: object) {
  localStorage.setItem(key, JSON.stringify(obj));
}

function getObject<T>(key: string): T | undefined {
  const json = localStorage.getItem(key);
  if (json) {
    const obj = JSON.parse(json);
    return obj as T;
  }
}

function removeObject(key: string) {
  localStorage.removeItem(key);
}

export { saveObject, getObject, removeObject };
