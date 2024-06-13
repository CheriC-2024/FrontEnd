import React from 'react';
import Svg, {
  Defs,
  RadialGradient,
  Stop,
  Rect,
  ClipPath,
} from 'react-native-svg';

interface RadialGradientComponentProps {
  colors: string[];
  style: object;
}

const RadialGradientComponent: React.FC<RadialGradientComponentProps> = ({
  colors,
  style,
}) => (
  <Svg style={style} viewBox="0 0 100 100">
    <Defs>
      <ClipPath id="clipPathRadial">
        <Rect x="0" y="0" width="100" height="100" rx="6" ry="6" />
      </ClipPath>
      <RadialGradient id="grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        {colors.map((color, index) => (
          <Stop
            key={index}
            offset={`${(index / (colors.length - 1)) * 100}%`}
            stopColor={color}
            stopOpacity="1"
          />
        ))}
      </RadialGradient>
    </Defs>
    <Rect
      x="0"
      y="0"
      width="100"
      height="100"
      fill="url(#grad)"
      clipPath="url(#clipPathRadial)"
    />
  </Svg>
);

export default RadialGradientComponent;
