import { useEffect } from 'react';

const useUnsavedReloadWarning = (hasUnsavedChanges: boolean) => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue = ''; // Some browsers require this to show a confirmation dialog
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);
};

export default useUnsavedReloadWarning;
