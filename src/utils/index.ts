import { Item } from '../interfaces';

export const shuffleItems = (items: number[]): Item[] => {
  const outputItems = items.map((item, i) => {
    return {
      value: item,
      index: i,
      selected: false,
      hasAlreadyBeenMatch: false,
    };
  });
  let currentIndex = outputItems.length;
  let randomIndex: number;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [outputItems[currentIndex], outputItems[randomIndex]] = [outputItems[randomIndex], outputItems[currentIndex]];
  }

  return outputItems;
};

export const createNumbers = (gridSize: number) => {
  return Array.from(Array(gridSize).keys());
};
