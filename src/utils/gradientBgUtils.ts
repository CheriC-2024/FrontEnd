export type GradientConfig = {
  key: string;
  start: { x: number; y: number };
  end: { x: number; y: number };
};

const gradientConfigurations: GradientConfig[] = [
  { key: 'TOP_DOWN', start: { x: 0, y: 0 }, end: { x: 0, y: 1 } },
  { key: 'DOWN_TOP', start: { x: 0, y: 1 }, end: { x: 0, y: 0 } },
  {
    key: 'LEFT_CORNER_RIGHT_CORNER',
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    key: 'RIGHT_CORNER_LEFT_CORNER',
    start: { x: 1, y: 1 },
    end: { x: 0, y: 0 },
  },
];

export const getGradientConfig = (type: string): GradientConfig => {
  return (
    gradientConfigurations.find((config) => config.key === type) || {
      start: { x: 0.5, y: 0 },
      end: { x: 0.5, y: 0.8 },
    }
  );
};
