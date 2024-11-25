import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import {
  addArtistDegreeReq,
  removeArtistDegreeReq,
  updateArtistDegreeReq,
  addArtistExhibitionReq,
  addArtistArtStorageReq,
  addArtistPrizeReq,
  addArtistResidenceReq,
  updateArtistContactReq,
} from 'src/slices/registerArtistSlice';
import { Container } from 'src/styles/layout';
import styled from 'styled-components/native';
import { Picker } from '@react-native-picker/picker';

const AddResume: React.FC = () => {
  const dispatch = useDispatch();
  const {
    artistContactReq,
    artistDegreeReqs,
    artistExhibitionReqs,
    artistArtStorageReqs,
    artistPrizeReqs,
    artistResidenceReqs,
  } = useSelector((state: RootState) => state.registerArtist);

  const [visibleFields, setVisibleFields] = useState({
    groupExhibition: false,
    artStorage: false,
    prize: false,
    residency: false,
  });

  const toggleField = (field: keyof typeof visibleFields) => {
    setVisibleFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleAddGroupExhibition = () => {
    dispatch(
      addArtistExhibitionReq({
        exhibitionName: '',
        location: '',
        byWho: '',
        exhibitionType: 'group',
        openedAt: 0,
      }),
    );
  };

  const handleAddArtStorage = () => {
    dispatch(
      addArtistArtStorageReq({
        location: '',
      }),
    );
  };

  const handleAddPrize = () => {
    dispatch(
      addArtistPrizeReq({
        organization: '',
        level: '',
        receivedAt: 0,
      }),
    );
  };

  const handleAddResidence = () => {
    dispatch(
      addArtistResidenceReq({
        residenceName: '',
      }),
    );
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* SNS Section */}
        <Section>
          <SectionTitle
            isCompleted={Boolean(
              artistContactReq.instagram || artistContactReq.email,
            )}
          >
            작가로 활동하는 SNS 또는 연락처
          </SectionTitle>
          <IconRow>
            <IconButton onPress={() => toggleField('groupExhibition')}>
              <Icon source={{ uri: 'group_exhibition_icon_url' }} />
            </IconButton>
            <IconButton onPress={() => toggleField('artStorage')}>
              <Icon source={{ uri: 'art_storage_icon_url' }} />
            </IconButton>
            <IconButton onPress={() => toggleField('prize')}>
              <Icon source={{ uri: 'prize_icon_url' }} />
            </IconButton>
            <IconButton onPress={() => toggleField('residency')}>
              <Icon source={{ uri: 'residency_icon_url' }} />
            </IconButton>
          </IconRow>
        </Section>

        {/* Group Exhibition Section */}
        <Section>
          <SectionHeader>
            <SectionTitle isCompleted={artistExhibitionReqs.length > 0}>
              단체전
            </SectionTitle>
            <AddButton onPress={handleAddGroupExhibition}>
              <AddButtonText>추가하기</AddButtonText>
            </AddButton>
          </SectionHeader>
          {artistExhibitionReqs.map((exhibition, index) => (
            <ExhibitionContainer key={index}>
              <Row>
                <PickerWrapper>
                  <Picker
                    selectedValue={exhibition.openedAt.toString()}
                    onValueChange={(value) =>
                      dispatch(
                        addArtistExhibitionReq({
                          ...exhibition,
                          openedAt: parseInt(value, 10),
                        }),
                      )
                    }
                  >
                    {Array.from({ length: 50 }, (_, i) => (
                      <Picker.Item
                        key={1970 + i}
                        label={`${1970 + i}`}
                        value={`${1970 + i}`}
                      />
                    ))}
                  </Picker>
                </PickerWrapper>
              </Row>
              <Input
                placeholder='전시명'
                value={exhibition.exhibitionName}
                onChangeText={(text) =>
                  dispatch(
                    addArtistExhibitionReq({
                      ...exhibition,
                      exhibitionName: text,
                    }),
                  )
                }
              />
              <Input
                placeholder='주최자'
                value={exhibition.byWho}
                onChangeText={(text) =>
                  dispatch(
                    addArtistExhibitionReq({
                      ...exhibition,
                      byWho: text,
                    }),
                  )
                }
              />
              <Input
                placeholder='지역'
                value={exhibition.location}
                onChangeText={(text) =>
                  dispatch(
                    addArtistExhibitionReq({
                      ...exhibition,
                      location: text,
                    }),
                  )
                }
              />
            </ExhibitionContainer>
          ))}
        </Section>

        {/* Art Storage Section */}
        <Section>
          <SectionHeader>
            <SectionTitle isCompleted={artistArtStorageReqs.length > 0}>
              작품 소장처
            </SectionTitle>
            <AddButton onPress={handleAddArtStorage}>
              <AddButtonText>추가하기</AddButtonText>
            </AddButton>
          </SectionHeader>
          {artistArtStorageReqs.map((storage, index) => (
            <ArtStorageContainer key={index}>
              <Input
                placeholder='소장처 위치'
                value={storage.location}
                onChangeText={(text) =>
                  dispatch(
                    addArtistArtStorageReq({
                      ...storage,
                      location: text,
                    }),
                  )
                }
              />
            </ArtStorageContainer>
          ))}
        </Section>

        {/* Prize Section */}
        <Section>
          <SectionHeader>
            <SectionTitle isCompleted={artistPrizeReqs.length > 0}>
              수상 및 선정
            </SectionTitle>
            <AddButton onPress={handleAddPrize}>
              <AddButtonText>추가하기</AddButtonText>
            </AddButton>
          </SectionHeader>
          {artistPrizeReqs.map((prize, index) => (
            <PrizeContainer key={index}>
              <Row>
                <PickerWrapper>
                  <Picker
                    selectedValue={prize.receivedAt.toString()}
                    onValueChange={(value) =>
                      dispatch(
                        addArtistPrizeReq({
                          ...prize,
                          receivedAt: parseInt(value, 10),
                        }),
                      )
                    }
                  >
                    {Array.from({ length: 50 }, (_, i) => (
                      <Picker.Item
                        key={1970 + i}
                        label={`${1970 + i}`}
                        value={`${1970 + i}`}
                      />
                    ))}
                  </Picker>
                </PickerWrapper>
              </Row>
              <Input
                placeholder='기관명'
                value={prize.organization}
                onChangeText={(text) =>
                  dispatch(
                    addArtistPrizeReq({
                      ...prize,
                      organization: text,
                    }),
                  )
                }
              />
              <Input
                placeholder='등급'
                value={prize.level}
                onChangeText={(text) =>
                  dispatch(
                    addArtistPrizeReq({
                      ...prize,
                      level: text,
                    }),
                  )
                }
              />
            </PrizeContainer>
          ))}
        </Section>

        {/* Residency Section */}
        <Section>
          <SectionHeader>
            <SectionTitle isCompleted={artistResidenceReqs.length > 0}>
              소속된 레지던시
            </SectionTitle>
            <AddButton onPress={handleAddResidence}>
              <AddButtonText>추가하기</AddButtonText>
            </AddButton>
          </SectionHeader>
          {artistResidenceReqs.map((residence, index) => (
            <ResidencyContainer key={index}>
              <Input
                placeholder='레지던시 이름'
                value={residence.residenceName}
                onChangeText={(text) =>
                  dispatch(
                    addArtistResidenceReq({
                      ...residence,
                      residenceName: text,
                    }),
                  )
                }
              />
            </ResidencyContainer>
          ))}
        </Section>
      </ScrollView>
    </Container>
  );
};

export default AddResume;

// Styled Components
const Section = styled.View`
  margin-bottom: 32px;
`;

const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled.Text<{ isCompleted: boolean }>`
  font-size: 16px;
  font-weight: bold;
  color: ${({ isCompleted, theme }) =>
    isCompleted ? theme.colors.cherryRed_10 : theme.colors.black};
`;

const IconRow = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
`;

const IconButton = styled.TouchableOpacity`
  margin-right: 16px;
`;

const Icon = styled.Image`
  width: 40px;
  height: 40px;
`;

const Input = styled.TextInput`
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.grey_2};
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 8px;
`;

const PickerWrapper = styled.View`
  flex: 1;
  border: 1px solid ${({ theme }) => theme.colors.grey_2};
  border-radius: 8px;
  margin-right: 8px;
`;

const AddButton = styled.TouchableOpacity`
  padding: 4px 8px;
  background-color: ${({ theme }) => theme.colors.grey_4};
  border-radius: 4px;
`;

const AddButtonText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.black};
`;

const ExhibitionContainer = styled.View`
  margin-bottom: 16px;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.grey_2};
  border-radius: 8px;
`;

const ArtStorageContainer = styled(ExhibitionContainer)``;

const PrizeContainer = styled(ExhibitionContainer)``;

const ResidencyContainer = styled(ExhibitionContainer)``;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;
