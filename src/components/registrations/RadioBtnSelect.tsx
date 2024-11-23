import React from 'react';
import { ViewStyle } from 'react-native';
import { ButtonText, Subtitle2 } from 'src/styles/typography';
import styled from 'styled-components/native';

interface RadioBtnSelectProps {
  label: string;
  selectedValue: boolean;
  onValueChange: (value: boolean) => void;
  required?: boolean;
  style?: ViewStyle;
}

const RadioBtnSelect: React.FC<RadioBtnSelectProps> = ({
  label,
  selectedValue,
  onValueChange,
  required = false,
  style,
}) => {
  return (
    <Container style={style}>
      <LabelWrapper>
        <Label>{label}</Label>
        {required && <RequiredMark>*</RequiredMark>}
      </LabelWrapper>
      <RadioGroup>
        <RadioButton onPress={() => onValueChange(true)}>
          <RadioCircle selected={selectedValue === true}>
            <InnerCircle selected={selectedValue === true} />
          </RadioCircle>
          <RadioLabel>공개</RadioLabel>
        </RadioButton>
        <RadioButton
          onPress={() => onValueChange(false)}
          style={{ paddingRight: 20 }}
        >
          <RadioCircle selected={selectedValue === false}>
            <InnerCircle selected={selectedValue === false} />
          </RadioCircle>
          <RadioLabel>비공개</RadioLabel>
        </RadioButton>
      </RadioGroup>
    </Container>
  );
};

export default RadioBtnSelect;

const Container = styled.View`
  flex-wrap: wrap;
`;

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

const RadioGroup = styled.View`
  flex-direction: row;
  align-items: center;
  border: 1px solid #eaeaea;
  border-radius: 20px;
  background-color: #fff;
`;

const RadioButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px; /* 버튼의 패딩만 설정 */
`;

const RadioCircle = styled.View`
  width: 24px;
  height: 24px;
  margin-right: 4px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.grey_4};
  align-items: center;
  justify-content: center;
`;

const InnerCircle = styled.View<{ selected: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.cherryRed_10 : 'transparent'};
`;

const RadioLabel = styled(ButtonText)`
  color: ${({ theme }) => theme.colors.grey_8};
`;
