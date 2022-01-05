export function getLocalStorage(key, defaultItem = null, options) {
  const storedItem = localStorage.getItem(key);
  const parsedItem = storedItem ? JSON.parse(storedItem) : defaultItem;

  if (Array.isArray(options)) {
    return options.includes(parsedItem) ? parsedItem : defaultItem;
  }

  return defaultItem;
}

export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
