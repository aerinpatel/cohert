import { atom, selector } from 'recoil';

export const counterAtom = atom({
  key: 'counterAtom',
  default: 0,
});

export const isEvenSelector = selector({
  key: 'isEvenSelector',
  get: ({ get }) => {
    const currentCount = get(counterAtom);
    return currentCount % 2 === 0;
  },
});
