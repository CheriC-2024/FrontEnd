import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

const GradientBackground = styled(LinearGradient as any).attrs({
  colors: ['rgb(255, 255, 255)', 'rgba(229, 44, 50, 0.1)'],
  start: { x: 0.5, y: 0.7 },
  end: { x: 0.5, y: 1 },
})`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export default GradientBackground;
