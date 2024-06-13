import React from 'react';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Path,
  ClipPath,
  Rect,
  G,
} from 'react-native-svg';

interface DiamondGradientComponentProps {
  colors: string[];
  style: object;
}

const DiamondGradientComponent: React.FC<DiamondGradientComponentProps> = ({
  colors,
  style,
}) => {
  return (
    <Svg style={style} viewBox="0 0 100 100">
      <Defs>
        <ClipPath id="clipPathDiamond">
          <Rect x="0" y="0" width="100" height="100" rx="6" ry="6" />
        </ClipPath>
        {/* 상단 그라디언트 */}
        <LinearGradient id="grad1" x1="50%" y1="0%" x2="50%" y2="100%">
          <Stop offset="0%" stopColor={colors[3]} />
          <Stop offset="25%" stopColor={colors[2]} />
          <Stop offset="50%" stopColor={colors[1]} />
          <Stop offset="75%" stopColor={colors[0]} />
        </LinearGradient>
        {/* 우측 그라디언트 */}
        <LinearGradient id="grad2" x1="0%" y1="50%" x2="100%" y2="50%">
          <Stop offset="25%" stopColor={colors[0]} />
          <Stop offset="50%" stopColor={colors[1]} />
          <Stop offset="75%" stopColor={colors[2]} />
          <Stop offset="100%" stopColor={colors[3]} />
        </LinearGradient>
        {/* 하단 그라디언트 */}
        <LinearGradient id="grad3" x1="50%" y1="100%" x2="50%" y2="0%">
          <Stop offset="0%" stopColor={colors[3]} />
          <Stop offset="25%" stopColor={colors[2]} />
          <Stop offset="50%" stopColor={colors[1]} />
          <Stop offset="75%" stopColor={colors[0]} />
        </LinearGradient>
        {/* 좌측 그라디언트 */}
        <LinearGradient id="grad4" x1="100%" y1="50%" x2="0%" y2="50%">
          <Stop offset="25%" stopColor={colors[0]} />
          <Stop offset="50%" stopColor={colors[1]} />
          <Stop offset="75%" stopColor={colors[2]} />
          <Stop offset="100%" stopColor={colors[3]} />
        </LinearGradient>
      </Defs>
      <G clipPath="url(#clipPathDiamond)">
        {/* 상단 삼각형 */}
        <Path d="M0,0 L100,0 L50,50 Z" fill="url(#grad1)" />
        {/* 우측 삼각형 */}
        <Path d="M100,0 L100,100 L50,50 Z" fill="url(#grad2)" />
        {/* 하단 삼각형 */}
        <Path d="M100,100 L0,100 L50,50 Z" fill="url(#grad3)" />
        {/* 좌측 삼각형 */}
        <Path d="M0,100 L0,0 L50,50 Z" fill="url(#grad4)" />
      </G>
    </Svg>
  );
};

export default DiamondGradientComponent;
