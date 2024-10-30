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

const Table: React.FC<TableProps> = ({ items }) => {
  return (
    <TableContainer>
      {items.map((item, index) => (
        <TableItem key={index} label={item.label} content={item.content} />
      ))}
    </TableContainer>
  );
};

const TableItem: React.FC<TableItemProps> = ({ label, content }) => (
  <TableRow>
    <TableCellLabel>{label}</TableCellLabel>
    <TableCellContent>{content}</TableCellContent>
  </TableRow>
);

const TableContainer = styled.View`
  width: 100%;
  border-width: 1px;
  border-color: #f2f0f0;
  border-radius: 24px;
  background-color: #fff;
  overflow: hidden;
`;

const TableRow = styled.View`
  flex-direction: row;
  padding: 8px;
  border-bottom-width: 1px;
  border-color: #f2f0f0;
`;

const TableCellLabel = styled(Caption)`
  flex: 1;
  font-weight: bold;
  text-align: center;
  color: ${({ theme }) => theme.colors.grey_8};
`;

const TableCellContent = styled(Caption)`
  flex: 2;
  text-align: center;
  color: ${({ theme }) => theme.colors.grey_8};
`;

export default Table;
