document.addEventListener('DOMContentLoaded', () => {
  const store = {
    get: (key) => {
      const storedValue = localStorage.getItem(key);
      if (!storedValue) { return undefined; }
      return JSON.parse(storedValue);
    },
    set: (key, val) => {
      const serializedVal = JSON.stringify(val);
      localStorage.setItem(key, serializedVal);
    }
  };

  const textarea = document.querySelector('textarea');
  const statusIndicator = document.querySelector('.status');

  const saveNote = () => {
    const noteContent = textarea.value;
    store.set('note', noteContent);
  };

  const loadNote = () => {
    const savedNote = store.get('note');

    if (savedNote) {
      textarea.value = savedNote;
    }
  };

  let saveDebounce;

  const handleChange = (e) => {
    if (saveDebounce) {
      clearTimeout(saveDebounce);
    }

    saveDebounce = setTimeout(() => {
      saveNote();
      saveDebounce = clearTimeout(saveDebounce);
      displaySaveIndicator();
    }, 750);
  };

  const displaySaveIndicator = () => {
    if (!saveDebounce) {
      statusIndicator.innerHTML = 'Saved!';

      setTimeout(() => {
        statusIndicator.innerHTML = '';
      }, 1000);
    }
  }

  textarea.addEventListener('input', handleChange);
  loadNote();
});