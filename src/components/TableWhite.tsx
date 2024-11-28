import React from 'react';
import styled from 'styled-components/native';
import { Caption } from 'src/styles/typography';

interface TableItemProps {
  label: string;
  content: string;
}

interface TableProps {
  items: TableItemProps[];
}

const TableWhite: React.FC<TableProps> = ({ items }) => {
  return (
    <TableContainer>
      {items.map((item, index) => (
        <TableRow key={index} isLastRow={index === items.length - 1}>
          <TableCellLabel>{item.label}</TableCellLabel>
          <TableCellContent>{item.content}</TableCellContent>
        </TableRow>
      ))}
    </TableContainer>
  );
};

const TableContainer = styled.View`
  width: 100%;
  border-width: 1px;
  border-color: #f2f0f0;
  border-radius: 12px;
  overflow: hidden;
`;

const TableRow = styled.View<{ isLastRow: boolean }>`
  flex-direction: row;
  padding: 12px 16px;
  border-bottom-width: ${({ isLastRow }) => (isLastRow ? '0px' : '1px')};
  border-color: #aaa; /* Adjusted border color */
`;

const TableCellLabel = styled(Caption)`
  flex: 1;
  font-weight: bold;
  text-align: center;
  color: #fff;
`;

const TableCellContent = styled(Caption)`
  flex: 2;
  text-align: center;
  color: #fff;
`;

export default TableWhite;
