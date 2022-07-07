import { icons } from './icons';

export const shuffleItems = (items: any[], returnItem = false): any => {
  const outputItems = items.map((item, i) => {
    if (returnItem) {
      return item;
    }
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

export const createIcons = (gridSize: number) => {
  const shuffledIcons = shuffleItems(icons, true);
  return shuffledIcons.slice(0, gridSize);
};

export const convertTime = (seconds: number) => {
  let output = '';
  const secs = seconds % 60;
  const mins = Math.floor(seconds / 60) % 60;
  const hours = Math.floor(seconds / 3600);

  function addLeadingZeroes(time: number) {
    return time < 10 ? `0${time}` : time;
  }
  if (hours > 0) {
    output += `${hours}:`;
  }
  output += `${mins}:${addLeadingZeroes(secs)}`;

  return output;
};
