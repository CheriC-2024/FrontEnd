import { ViewStyle } from 'react-native';
import { H6, Subtitle2 } from 'src/styles/typography';
import styled from 'styled-components/native';

interface ArtworkSizeInputProps {
  width: number;
  height: number;
  onWidthChange: (value: number) => void;
  onHeightChange: (value: number) => void;
  required?: boolean;
  style?: ViewStyle;
}

const ArtworkSizeInput: React.FC<ArtworkSizeInputProps> = ({
  width,
  height,
  onWidthChange,
  onHeightChange,
  required = false,
  style,
}) => {
  return (
    <Container style={style}>
      <LabelWrapper>
        <Label>작품 크기</Label>
        {required && <RequiredMark>*</RequiredMark>}
      </LabelWrapper>
      <InputWrapper>
        <Input
          placeholder='가로 길이'
          value={width === 0 ? '' : width.toString()}
          keyboardType='numeric'
          onChangeText={(text) => {
            const numberValue = parseInt(text, 10); // 문자열을 숫자로 변환
            onWidthChange(isNaN(numberValue) ? 0 : numberValue); // NaN이면 0으로 설정
          }}
        />
        <H6>*</H6>
        <Input
          placeholder='세로 길이'
          value={height === 0 ? '' : height.toString()}
          keyboardType='numeric'
          onChangeText={(text) => {
            const numberValue = parseInt(text, 10); // 문자열을 숫자로 변환
            onHeightChange(isNaN(numberValue) ? 0 : numberValue); // NaN이면 0으로 설정
          }}
        />
        <Unit>(단위:mm)</Unit>
      </InputWrapper>
    </Container>
  );
};

export default ArtworkSizeInput;

const Container = styled.View`
  flex-direction: column;
  align-items: flex-start;
`;

const LabelWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 2px;
`;

const Label = styled(Subtitle2)`
  margin-left: 4px;
  margin-bottom: 4px;
`;

const RequiredMark = styled(Subtitle2)`
  color: ${({ theme }) => theme.colors.cherryRed_10};
`;

const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const Input = styled.TextInput`
  border-radius: 28px;
  padding: 12px 28px;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 14px;
  text-align: center;
  color: ${({ theme }) => theme.colors.redBlack};
  background-color: #f7f5f5;
`;

const Unit = styled(Subtitle2)`
  color: ${({ theme }) => theme.colors.redBlack};
`;
