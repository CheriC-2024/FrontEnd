import React from 'react';
import styled from 'styled-components/native';
import { TextInput } from 'react-native';

const FilterInputContainer = styled.View`
  margin-bottom: 16px;
`;

const FilterTextInput = styled(TextInput)`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;
`;

interface FilterInputProps {
  filterText: string;
  setFilterText: (text: string) => void;
}

const FilterInput: React.FC<FilterInputProps> = ({
  filterText,
  setFilterText,
}) => {
  return (
    <FilterInputContainer>
      <FilterTextInput
        placeholder="필터링"
        value={filterText}
        onChangeText={setFilterText}
      />
    </FilterInputContainer>
  );
};

export default FilterInput;
