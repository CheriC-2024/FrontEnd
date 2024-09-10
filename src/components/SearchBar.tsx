import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native';

const SearchBarContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: ${(props) => props.theme.radius.m};
  padding: ${(props) => props.theme.spacing.s3} 0;
  padding-left: ${(props) => props.theme.spacing.s4};
  background-color: ${(props) => props.theme.colors.grey_4};
`;

const SearchTextInput = styled(TextInput)`
  flex: 1;
  margin-left: ${(props) => props.theme.spacing.s3};
  font-size: ${({ theme }) => theme.fontSizes.button};
  line-height: ${({ theme }) => theme.lineHeights.button};
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${(props) => props.theme.colors.redBlack};
`;

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
      <Icon name="search" size={15} color="#413333" />
      <SearchTextInput
        placeholder={placeholder}
        placeholderTextColor="#B0ABAB"
        value={filterText}
        onChangeText={setFilterText}
      />
    </SearchBarContainer>
  );
};

export default SearchBar;
