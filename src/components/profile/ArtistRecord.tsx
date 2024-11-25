import styled from 'styled-components/native';
import { Subtitle2, Caption } from 'src/styles/typography';
import { View } from 'react-native';

interface ArtistResume {
  artistDegreeRess: {
    entranceAt: string;
    graduateAt: string;
    major: string;
    schoolName: string;
  }[];
  artistExhibitionRess: {
    exhibitionName: string;
    exhibitionType: string;
    location: string;
    openedAt: string;
  }[];
  artistPrizeRess: {
    level: string;
    organization: string;
    receivedAt: string;
  }[];
  artistResidenceRess: { residenceName: string }[];
  artistArtStorageRess: { location: string }[];
}

interface ArtistRecordProps {
  artistResume: ArtistResume;
}

const ArtistRecord: React.FC<ArtistRecordProps> = ({ artistResume }) => {
  // 개인전 데이터 필터링
  const individualExhibitions = artistResume.artistExhibitionRess.filter(
    (item) => item.exhibitionType === 'INDIVIDUAL',
  );
  // 단체전 데이터 필터링
  const groupExhibitions = artistResume.artistExhibitionRess.filter(
    (item) => item.exhibitionType === 'GROUP',
  );
  return (
    <Container>
      <Section>
        <SectionTitle>학력</SectionTitle>
        {artistResume.artistDegreeRess.map((item, index) => (
          <HistoryText key={index}>
            {item.schoolName} ({item.entranceAt} ~ {item.graduateAt}),{' '}
            {item.major}
          </HistoryText>
        ))}
      </Section>
      <Section>
        <SectionTitle>개인전</SectionTitle>
        {individualExhibitions.map((item, index) => (
          <HistoryText key={index}>
            {item.openedAt} 《{item.exhibitionName}》, {item.location}
          </HistoryText>
        ))}
      </Section>
      <Section>
        <SectionTitle>단체전</SectionTitle>
        {groupExhibitions.map((item, index) => (
          <HistoryText key={index}>
            {item.openedAt} 《{item.exhibitionName}》, {item.location}
          </HistoryText>
        ))}
      </Section>
      <RowContainer>
        <HalfSection>
          <SectionTitle>작가의 작품 소장처</SectionTitle>
          {artistResume.artistArtStorageRess.map((item, index) => (
            <HistoryText key={index}>{item.location}</HistoryText>
          ))}
        </HalfSection>
        <HalfSection>
          <SectionTitle>레지던시</SectionTitle>
          {artistResume.artistResidenceRess.map((item, index) => (
            <HistoryText key={index}>{item.residenceName}</HistoryText>
          ))}
        </HalfSection>
      </RowContainer>
      <Section>
        <SectionTitle>수상 및 선정</SectionTitle>
        {artistResume.artistPrizeRess.map((item, index) => (
          <HistoryText key={index}>
            {item.receivedAt} {item.level} - {item.organization}
          </HistoryText>
        ))}
      </Section>
      <View style={{ height: 300 }} />
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
