import React from 'react';
import styled from 'styled-components/native';
import { TextInput, View, ViewStyle } from 'react-native';
import { Subtitle2, Caption } from '../styles/typography';
import { theme } from 'src/styles/theme';
interface InfoBlockProps {
  label: string;
  placeholder: string;
  maxLength: number;
  value: string;
  required?: boolean;
  style?: ViewStyle;
  onChangeText?: (text: string) => void;
}

const InfoBlock: React.FC<InfoBlockProps> = ({
  label,
  placeholder,
  maxLength,
  value,
  required = false,
  style,
  onChangeText = () => {},
}) => {
  return (
    <View style={style}>
      <Label>
        {label}
        {required && <RequiredAsterisk> *</RequiredAsterisk>}
      </Label>
      <InputWrapper>
        <Input
          multiline
          numberOfLines={4}
          maxLength={maxLength}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.grey_6}
        />
        <CharacterCount>
          <CharacterCountText>{value.length}</CharacterCountText> / {maxLength}
        </CharacterCount>
      </InputWrapper>
    </View>
  );
};

const Label = styled(Subtitle2)`
  color: ${({ theme }) => theme.colors.redBlack};
  margin-bottom: ${({ theme }) => theme.spacing.s1};
  margin-left: ${({ theme }) => theme.spacing.s1};
  flex-direction: row;
`;

const RequiredAsterisk = styled.Text`
  color: ${({ theme }) => theme.colors.cherryRed_10};
  padding-left: ${({ theme }) => theme.spacing.s1};
`;

const InputWrapper = styled.View`
  position: relative;
`;

const Input = styled(TextInput)`
  height: 150px;
  background-color: ${({ theme }) => theme.colors.grey_4};
  padding: ${({ theme }) => theme.spacing.s4};
  padding-bottom: ${({ theme }) => theme.spacing.s8};
  border-radius: ${({ theme }) => theme.radius.m};
  font-size: ${({ theme }) => theme.fontSizes.body2};
  line-height: ${({ theme }) => theme.lineHeights.body2};
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.redBlack};
  text-align-vertical: top;
`;

const CharacterCount = styled(Caption)`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.s4};
  right: ${({ theme }) => theme.spacing.s4};
  color: ${({ theme }) => theme.colors.grey_6};
`;

const CharacterCountText = styled.Text`
  color: ${({ theme }) => theme.colors.redBlack};
`;

export default InfoBlock;
