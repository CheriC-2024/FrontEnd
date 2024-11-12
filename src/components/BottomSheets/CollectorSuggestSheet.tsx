import React from 'react';
import {
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  Animated,
  View,
} from 'react-native';
import styled from 'styled-components/native';

import { useNavigation } from '@react-navigation/native';
import useSlideAnimation from 'src/hooks/useSlideAnimation';
import { artistData } from 'src/screens/data';
import ProfileRow from '../profile/ProfileRow';
import { ButtonText, H4 } from 'src/styles/typography';
import SeparatorLine from '../SeparatorLine';

interface CollectorBottomSheetProps {
  onClose: () => void;
}

const CollectorSuggestSheet: React.FC<CollectorBottomSheetProps> = ({
  onClose,
}) => {
  const navigation = useNavigation();
  const { slideAnim, slideOut } = useSlideAnimation(0.6, 500);

  const handleClose = () => slideOut(onClose);

  return (
    <Modal transparent={true} animationType='none'>
      <TouchableWithoutFeedback onPress={handleClose}>
        <Overlay />
      </TouchableWithoutFeedback>

      <SheetContainer>
        <Animated.View
          style={{
            transform: [{ translateY: slideAnim }],
          }}
        >
          <SheetContent>
            <Title>😎 추천 컬렉터</Title>
            <Subtitle>
              컬렉터님의 관심분야를 기반으로 추천된 컬렉터에요
            </Subtitle>

            <FlatList
              data={artistData}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <ProfileRow
                  image={item.image}
                  name={item.name}
                  category={item.description}
                  size={60}
                  userId={item.id}
                  onPress={() =>
                    console.log(`Navigating to profile of ${item.name}`)
                  }
                />
              )}
              ItemSeparatorComponent={() => (
                <SeparatorLine margin={6} width='100%' />
              )}
              ListFooterComponent={() => <View style={{ height: 60 }}></View>}
            />
          </SheetContent>
        </Animated.View>
      </SheetContainer>
    </Modal>
  );
};

export default CollectorSuggestSheet;

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;

const SheetContainer = styled.View`
  flex: 0.7;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.colors.redBlack_alpha50};
`;

const SheetContent = styled.View`
  background-color: #fcf9f9;
  padding: 36px 16px;
  border-top-left-radius: ${({ theme }) => theme.radius.l};
  border-top-right-radius: ${({ theme }) => theme.radius.l};
`;

const Title = styled(H4)``;

const Subtitle = styled(ButtonText)`
  margin-bottom: 18px;
`;
