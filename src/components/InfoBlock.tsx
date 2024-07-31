// src/components/InfoBlock.tsx
import React from 'react';
import styled from 'styled-components/native';
import { TextInput, View } from 'react-native';
import { Subtitle2, Caption } from './Typography';

const Container = styled.View`
  margin: ${({ theme }) => theme.spacing.s4};
`;

const Label = styled(Subtitle2)`
  color: ${({ theme }) => theme.colors.redBlack};
  margin-bottom: ${({ theme }) => theme.spacing.s1};
  margin-left: ${({ theme }) => theme.spacing.s1};
`;

const Input = styled(TextInput)`
  background-color: ${({ theme }) => theme.colors.grey_4};
  padding: ${({ theme }) => theme.spacing.s4};
  border-radius: ${({ theme }) => theme.radius.m};
  font-size: ${({ theme }) => theme.fontSizes.body2};
  color: ${({ theme }) => theme.colors.redBlack};
`;

const CharacterCount = styled(Caption)`
  align-self: flex-end;
  color: ${({ theme }) => theme.colors.grey_6};
`;

interface InfoBlockProps {
  label: string;
  placeholder: string;
  maxLength: number;
}

const InfoBlock: React.FC<InfoBlockProps> = ({
  label,
  placeholder,
  maxLength,
}) => {
  const [text, setText] = React.useState('');

  return (
    <Container>
      <Label>{label}</Label>
      <Input
        multiline
        numberOfLines={4}
        maxLength={maxLength}
        value={text}
        onChangeText={setText}
        placeholder={placeholder}
        placeholderTextColor={'#9E9E9E'}
      />
      <CharacterCount>{`${text.length} / ${maxLength}`}</CharacterCount>
    </Container>
  );
};

export default InfoBlock;
