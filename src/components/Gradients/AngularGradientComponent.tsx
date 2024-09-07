import React from 'react';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Polygon,
  Rect,
  ClipPath,
  G,
} from 'react-native-svg';

interface AngularGradientComponentProps {
  colors: string[];
  style: object;
}

const AngularGradientComponent: React.FC<AngularGradientComponentProps> = ({
  colors,
  style,
}) => {
  return (
    <Svg style={style} viewBox='0 0 100 100'>
      <Defs>
        <ClipPath id='clipPath'>
          <Rect x='0' y='0' width='100' height='100' rx='6' ry='6' />
        </ClipPath>
        <LinearGradient id='grad1' x1='0%' y1='0%' x2='100%' y2='100%'>
          <Stop offset='0%' stopColor={colors[0]} />
          <Stop offset='50%' stopColor={colors[1]} />
          <Stop offset='100%' stopColor={colors[2]} />
        </LinearGradient>
        <LinearGradient id='grad2' x1='100%' y1='0%' x2='0%' y2='100%'>
          <Stop offset='0%' stopColor={colors[1]} />
          <Stop offset='50%' stopColor={colors[2]} />
          <Stop offset='100%' stopColor={colors[3]} />
        </LinearGradient>
        <LinearGradient id='grad3' x1='0%' y1='100%' x2='100%' y2='0%'>
          <Stop offset='0%' stopColor={colors[2]} />
          <Stop offset='50%' stopColor={colors[3]} />
          <Stop offset='100%' stopColor={colors[0]} />
        </LinearGradient>
        <LinearGradient id='grad4' x1='100%' y1='100%' x2='0%' y2='0%'>
          <Stop offset='0%' stopColor={colors[3]} />
          <Stop offset='50%' stopColor={colors[0]} />
          <Stop offset='100%' stopColor={colors[1]} />
        </LinearGradient>
      </Defs>
      <G clipPath='url(#clipPath)'>
        <Rect x='0' y='0' width='100' height='100' fill='url(#grad1)' />
        <Polygon points='10,10 90,10 50,50' fill='url(#grad2)' />
        <Polygon points='90,10 90,90 50,50' fill='url(#grad3)' />
        <Polygon points='90,90 10,90 50,50' fill='url(#grad4)' />
        <Polygon points='10,90 10,10 50,50' fill='url(#grad1)' />
      </G>
    </Svg>
  );
};

export default AngularGradientComponent;
