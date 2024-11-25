import { ViewStyle } from 'react-native';
import { Subtitle2 } from 'src/styles/typography';
import styled from 'styled-components/native';

interface InputBlockProps {
  label: string;
  placeholder?: string;
  unit?: string;
  required?: boolean;
  value: number;
  onChangeText: (text: number) => void;
  style?: ViewStyle;
}

const InputBlock: React.FC<InputBlockProps> = ({
  label,
  placeholder = '',
  unit = '',
  required = false,
  value = 0,
  onChangeText,
  style,
}) => {
  return (
    <Container style={style}>
      <LabelWrapper>
        <Label>{label}</Label>
        {required && <RequiredMark>*</RequiredMark>}
      </LabelWrapper>
      <InputWrapper>
        <StyledInput
          placeholder={placeholder}
          value={value === 0 ? '' : value.toString()} // 숫자를 문자열로 변환
          onChangeText={(text) => {
            const numericValue = parseInt(text.replace(/[^0-9]/g, ''), 10); // 숫자만 추출
            onChangeText(isNaN(numericValue) ? 0 : numericValue); // 숫자가 아니면 0
          }}
          keyboardType='numeric'
        />
        {unit && <Subtitle2>{unit}</Subtitle2>}
      </InputWrapper>
    </Container>
  );
};

export default InputBlock;

const Container = styled.View``;

const LabelWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
  margin-left: 4px;
`;

const Label = styled(Subtitle2)``;

const RequiredMark = styled(Subtitle2)`
  color: ${({ theme }) => theme.colors.cherryRed_10};
  margin-left: 2px;
`;

const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const StyledInput = styled.TextInput`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.regular};
  padding: 10px 35px;
  border-radius: 20px;
  background-color: #f9f9f9;
  text-align: center;
`;
