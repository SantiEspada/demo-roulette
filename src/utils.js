export const getCoordinatesForPercent = (percent) => {
  const x = Math.cos(2 * Math.PI * percent);
  const y = Math.sin(2 * Math.PI * percent);
  return [x, y];
};

export const getRandomColor = () => `hsl(${Math.random() * 360}, 70%, 70%)`;

export const checkContrast = (newColor, existentColors) => {
  if(existentColors.length === 0) return true;

  const getHue = (color) => Number(/[^hsl(]([0-9.]+)/.exec(color)[0]);

  const newHue = getHue(newColor)
  return existentColors.every(color => {
    const hue = getHue(color);

    return ((newHue > (hue + 10)) || (newHue < (hue-10)));
  });
}

export const getTextColorFromBackground = (bgColor) => bgColor.replace('100%', '20%');