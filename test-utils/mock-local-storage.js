export const localStorageImpl = {
  register: () => {
    let storage = window.customLocalStorage;

    if (storage) {
      return {
        storage,
        methods: window.customLocalStorageMethods,
      };
    }

    storage = window.customLocalStorage = {};

    const setItem = jest.spyOn(Storage.prototype, "setItem");
    setItem.mockImplementation((key, value) => {
      storage[key] = value;
    });

    const getItem = jest.spyOn(Storage.prototype, "getItem");
    getItem.mockImplementation((key) => {
      return storage[key];
    });

    const methods = (window.customLocalStorageMethods = {
      setItem,
      getItem,
    });

    return {
      storage,
      methods,
    };
  },
  unregister: () => {
    const methods = window.customLocalStorageMethods;
    if (methods) {
      const { setItem, getItem } = methods;
      setItem.mockReset();
      getItem.mockReset();
    }
    delete window.customLocalStorageMethods;
    delete window.customLocalStorage;
  },
};
