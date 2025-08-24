export const handleKeyDownArabic = (
  event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { key, ctrlKey, metaKey } = event;
  // Allow control keys like backspace, delete, arrow keys, etc.
  if (
    key === "Backspace" ||
    key === "Delete" ||
    key === "ArrowLeft" ||
    key === "ArrowRight" ||
    key === "ArrowUp" ||
    key === "ArrowDown" ||
    key === "Tab" ||
    key === "Enter"
  ) {
    return; // Allow these keys without further checking
  }
  // Allow copy, paste, cut, select all (Ctrl/Command + C, V, X, A)
  if (
    (ctrlKey || metaKey) &&
    (key === "c" || key === "v" || key === "x" || key === "a")
  ) {
    return;
  }
  // Check if the key matches Arabic characters, numbers, symbols, or whitespace
  if (!/[\u0600-\u06FF0-9\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(key)) {
    event.preventDefault();
  }
};

export const handleKeyDownEnglish = (
  event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { key, ctrlKey, metaKey } = event;
  // Allow control keys like backspace, delete, arrow keys, etc.
  if (
    key === "Backspace" ||
    key === "Delete" ||
    key === "ArrowLeft" ||
    key === "ArrowRight" ||
    key === "ArrowUp" ||
    key === "ArrowDown" ||
    key === "Tab" ||
    key === "Enter"
  ) {
    return; // Allow these keys without further checking
  }
  // Allow copy, paste, cut, select all (Ctrl/Command + C, V, X, A)
  if (
    (ctrlKey || metaKey) &&
    (key === "c" || key === "v" || key === "x" || key === "a")
  ) {
    return;
  }

  // Check if the key matches English letters, numbers, or symbols
  if (!/[A-Za-z0-9\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(key)) {
    event.preventDefault();
  }
};

export const handleKeyDownNumber = (
  event: React.KeyboardEvent<HTMLInputElement>
) => {
  const { key, ctrlKey, metaKey } = event;

  // Allow keys for navigation, deletion, tab, and enter
  if (
    key === "Backspace" ||
    key === "Delete" ||
    key === "ArrowLeft" ||
    key === "ArrowRight" ||
    key === "ArrowUp" ||
    key === "ArrowDown" ||
    key === "Tab" ||
    key === "Enter"
  ) {
    return;
  }

  // Allow copy, paste, cut, select all (Ctrl/Command + C, V, X, A)
  if (
    (ctrlKey || metaKey) &&
    (key === "c" || key === "v" || key === "x" || key === "a")
  ) {
    return;
  }

  // Prevent non-numeric input
  if (!/[0-9]/.test(key)) {
    event.preventDefault();
  }
};

export const handleKeyDownNumberNoCopy = (
  event: React.KeyboardEvent<HTMLInputElement>
) => {
  const { key } = event;

  // Allow keys for navigation, deletion, tab, and enter
  if (
    key === "Backspace" ||
    key === "Delete" ||
    key === "ArrowLeft" ||
    key === "ArrowRight" ||
    key === "ArrowUp" ||
    key === "ArrowDown" ||
    key === "Tab" ||
    key === "Enter"
  ) {
    return;
  }
  // Prevent non-numeric input
  if (!/[0-9]/.test(key)) {
    event.preventDefault();
  }
};


export const handleKeyDownFloatNumber = (
  event: React.KeyboardEvent<HTMLInputElement>
) => {
  const { key, ctrlKey, metaKey } = event;
  const input = event.currentTarget;

  // Allow keys for navigation, deletion, tab, and enter
  if (
    key === "Backspace" ||
    key === "Delete" ||
    key === "ArrowLeft" ||
    key === "ArrowRight" ||
    key === "ArrowUp" ||
    key === "ArrowDown" ||
    key === "Tab" ||
    key === "Enter"
  ) {
    return;
  }

  // Allow copy, paste, cut, select all (Ctrl/Command + C, V, X, A)
  if (
    (ctrlKey || metaKey) &&
    (key === "c" || key === "v" || key === "x" || key === "a")
  ) {
    return;
  }

  // Allow one decimal point if it doesn't already exist
  if (key === "." && !input.value.includes(".")) {
    return;
  }

  // Prevent non-numeric input (allow numbers and one decimal point)
  if (!/[0-9]/.test(key) && key !== ".") {
    event.preventDefault();
  }
};
