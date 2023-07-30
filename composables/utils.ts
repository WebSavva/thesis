import { type ComponentCustomProperties, getCurrentInstance } from 'vue';

export const defineGlobalComposable = <
  K extends keyof ComponentCustomProperties
>(
  key: K
) => {
  return () => {
    const $vm = getCurrentInstance();

    if (!$vm) throw new Error('[ int ]: No instance is found !');

    return ($vm.proxy as ComponentCustomProperties)[key];
  };
};
