import { type ComponentCustomProperties, getCurrentInstance } from 'vue';

export const useInternalization = () => {
  const $vm = getCurrentInstance();

  if (!$vm) throw new Error('[ int ]: No instance is found !');

  const { $int } =
    $vm.proxy as ComponentCustomProperties;

  return $int;
};
