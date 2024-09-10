import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Caption } from 'src/styles/typography';

interface TagButtonProps {
  text: string;
  onRemove: () => void;
  backgroundColor?: string;
  textColor?: string;
  showHash?: boolean;
}

const TagButton: React.FC<TagButtonProps> = ({
  text,
  onRemove,
  backgroundColor,
  textColor,
  showHash = true,
}) => {
  const theme = useTheme();

  return (
    <TagContainer backgroundColor={backgroundColor || theme.colors.grey_8}>
      <TagText textColor={textColor || theme.colors.white}>
        {showHash ? `# ${text}` : text}
      </TagText>
      <RemoveButton onPress={onRemove}>
        <Icon
          name="close-outline"
          size={16}
          color={textColor || theme.colors.white}
        />
      </RemoveButton>
    </TagContainer>
  );
};

export default TagButton;

const TagContainer = styled.View<{ backgroundColor: string }>`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.backgroundColor};
  padding: 0 2px 0 ${(props) => props.theme.spacing.s2};
  border-radius: ${(props) => props.theme.radius.l};
  margin-right: ${(props) => props.theme.margin.xs};
  margin-bottom: ${(props) => props.theme.margin.xs};
`;

const TagText = styled(Caption)<{ textColor: string }>`
  color: ${(props) => props.textColor};
`;

const RemoveButton = styled.TouchableOpacity`
  padding: ${(props) => props.theme.spacing.s1};
`;
