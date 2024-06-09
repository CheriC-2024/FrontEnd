import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native';

const FilterInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: 20px;
  padding: 12px 14px;
  background-color: #f7f5f5;
`;

const FilterTextInput = styled(TextInput)`
  flex: 1;
  margin-left: 8px;
  font-family: 'Regular';
  font-size: 12px;
  letter-spacing: 0.5px;
  color: #120000;
`;

interface FilterInputProps {
  filterText: string;
  setFilterText: (text: string) => void;
  placeholder: string;
}

const FilterInput: React.FC<FilterInputProps> = ({
  filterText,
  setFilterText,
  placeholder,
}) => {
  return (
    <FilterInputContainer>
      <Icon name="search" size={15} color="#413333" />
      <FilterTextInput
        placeholder={placeholder}
        value={filterText}
        onChangeText={setFilterText}
      />
    </FilterInputContainer>
  );
};

export default FilterInput;
