// Track showModal() order, which can differ from the dialogs' DOM order.
const layers: HTMLDialogElement[] = [];
const listeners = new Set<() => void>();

export const getActiveModal = () => layers.at(-1) ?? null;
export const subscribeModalLayers = (listener: () => void) => {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
};

export function registerModalLayer(dialog: HTMLDialogElement) {
  layers.push(dialog);
  listeners.forEach(listener => listener());
  return () => {
    const index = layers.lastIndexOf(dialog);
    if (index !== -1) layers.splice(index, 1);
    listeners.forEach(listener => listener());
  };
}
