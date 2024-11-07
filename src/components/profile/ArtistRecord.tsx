// components/ArtistRecord.tsx

import React from 'react';
import styled from 'styled-components/native';
import { Subtitle2, Caption } from 'src/styles/typography';

interface ArtistHistory {
  education: string[];
  soloExhibitions: { year: string; title: string; location: string }[];
  groupExhibitions: { year: string; title: string; location: string }[];
  collections: string[];
  awards: { year: string; title: string }[];
  residency: { year: string; title: string }[];
}

interface ArtistRecordProps {
  artistHistory: ArtistHistory;
}

const ArtistRecord: React.FC<ArtistRecordProps> = ({ artistHistory }) => {
  return (
    <Container>
      <Section>
        <SectionTitle>학력</SectionTitle>
        {artistHistory.education.map((item, index) => (
          <HistoryText key={index}>{item}</HistoryText>
        ))}
      </Section>
      <Section>
        <SectionTitle>개인전</SectionTitle>
        {artistHistory.soloExhibitions.map((item, index) => (
          <HistoryText key={index}>
            {item.year} 《{item.title}》, {item.location}
          </HistoryText>
        ))}
      </Section>
      <Section>
        <SectionTitle>단체전</SectionTitle>
        {artistHistory.groupExhibitions.map((item, index) => (
          <HistoryText key={index}>
            {item.year} 《{item.title}》, {item.location}
          </HistoryText>
        ))}
      </Section>
      <RowContainer>
        <HalfSection>
          <SectionTitle>작가의 작품 소장처</SectionTitle>
          {artistHistory.collections.map((item, index) => (
            <HistoryText key={index}>{item}</HistoryText>
          ))}
        </HalfSection>
        <HalfSection>
          <SectionTitle>레지던시</SectionTitle>
          {artistHistory.residency.map((item, index) => (
            <HistoryText key={index}>
              {item.year} {item.title}
            </HistoryText>
          ))}
        </HalfSection>
      </RowContainer>
      <Section>
        <SectionTitle>수상 및 선정</SectionTitle>
        {artistHistory.awards.map((item, index) => (
          <HistoryText key={index}>
            {item.year} {item.title}
          </HistoryText>
        ))}
      </Section>
    </Container>
  );
};

export default ArtistRecord;

const Container = styled.View`
  padding: 16px;
`;

const Section = styled.View`
  background-color: #fff;
  padding: 16px;
  border-radius: ${({ theme }) => theme.radius.s};
  border-width: 1px;
  border-color: #f2f0f0;
  margin-bottom: 16px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const HalfSection = styled(Section)`
  flex: 1;
  margin-right: 8px;
`;

const SectionTitle = styled(Subtitle2)`
  margin-bottom: 8px;
`;

const HistoryText = styled(Caption)`
  margin-bottom: 4px;
  line-height: 20px;
`;
