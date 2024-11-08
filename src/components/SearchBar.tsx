import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native';
import { XIcon } from 'src/assets/icons/_index';
interface SearchBarProps {
  filterText: string;
  setFilterText: (text: string) => void;
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  filterText,
  setFilterText,
  placeholder,
}) => {
  return (
    <SearchBarContainer>
      <Icon name='search' size={15} color='#413333' />
      <SearchTextInput
        placeholder={placeholder}
        placeholderTextColor='#B0ABAB'
        value={filterText}
        onChangeText={setFilterText}
      />
      <DeleteButton onPress={() => setFilterText('')}>
        <XIcon width='12' height='12' />
      </DeleteButton>
    </SearchBarContainer>
  );
};

export default SearchBar;

const SearchBarContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.s3} 0;
  padding-left: ${({ theme }) => theme.spacing.s4};
  border-radius: ${({ theme }) => theme.radius.m};
  background-color: ${({ theme }) => theme.colors.grey_4};
`;

const SearchTextInput = styled(TextInput)`
  flex: 1;
  margin-left: ${({ theme }) => theme.spacing.s3};
  font-size: ${({ theme }) => theme.fontSizes.button};
  line-height: ${({ theme }) => theme.lineHeights.button};
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.redBlack};
`;

const DeleteButton = styled.TouchableOpacity`
  padding-right: ${({ theme }) => theme.padding.m};
`;
