import React, { useEffect, useRef } from 'react';
import {
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Body2, Caption, Subtitle2 } from 'src/styles/typography';
import styled from 'styled-components/native';
import {
  BlogIcon,
  EmailIcon,
  ForwardIcon,
  ForwardIconWhite,
  InstagramIcon,
} from 'src/assets/icons/_index.js';

interface RequestArtworkSheetProps {
  onClose: () => void;
  artistId: number | null;
  artistContact: {
    email: string;
    instagram: string;
    naverBlog: string;
    twitter: string;
  };
}

const RequestArtworkSheet: React.FC<RequestArtworkSheetProps> = ({
  onClose,
  artistId,
  artistContact,
}) => {
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  const animateClose = (callback?: () => void) => {
    Animated.timing(slideAnim, {
      toValue: 330,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      if (callback) callback();
    });
  };

  const handleClose = () => {
    animateClose(onClose);
  };

  const handleRequestPress = () => {
    handleClose();
    navigation.navigate('RequestArtwork', { artistId });
  };

  return (
    <Modal transparent={true} animationType='none'>
      <TouchableWithoutFeedback onPress={handleClose}>
        <SheetContainer>
          <TouchableWithoutFeedback onPress={() => {}}>
            <Animated.View
              style={{
                transform: [{ translateY: slideAnim }],
              }}
            >
              <SheetContent>
                <RequestButton onPress={handleRequestPress}>
                  <RequestButtonText>
                    작가님께 작품 등록 요청드리기
                  </RequestButtonText>
                  <ForwardIconWhite />
                </RequestButton>

                <LinksContainer>
                  <Subtitle2>링크</Subtitle2>
                  {artistContact.instagram && (
                    <LinkButton
                      onPress={() => Linking.openURL(artistContact.instagram)}
                    >
                      <InstagramIcon />
                      <LinkText>{artistContact.instagram}</LinkText>
                    </LinkButton>
                  )}
                  {artistContact.naverBlog && (
                    <LinkButton
                      onPress={() => Linking.openURL(artistContact.naverBlog)}
                    >
                      <BlogIcon />
                      <LinkText>{artistContact.naverBlog}</LinkText>
                    </LinkButton>
                  )}
                  {artistContact.email && (
                    <LinkButton
                      onPress={() =>
                        Linking.openURL(`mailto:${artistContact.email}`)
                      }
                    >
                      <EmailIcon />
                      <LinkText>{artistContact.email}</LinkText>
                    </LinkButton>
                  )}
                </LinksContainer>
              </SheetContent>
            </Animated.View>
          </TouchableWithoutFeedback>
        </SheetContainer>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default RequestArtworkSheet;

const SheetContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
`;

const SheetContent = styled.View`
  background-color: #fcf9f9;
  padding: 28px 16px;
  border-top-left-radius: ${({ theme }) => theme.radius.l};
  border-top-right-radius: ${({ theme }) => theme.radius.l};
`;

const RequestButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 20px;
  background-color: ${({ theme }) => theme.colors.redBlack};
  border-radius: ${({ theme }) => theme.radius.l};
  margin-bottom: 14px;
`;

const RequestButtonText = styled(Body2)`
  color: ${({ theme }) => theme.colors.bg};
`;

const LinksContainer = styled.View``;

const LinkButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 8px 0;
`;

const LinkText = styled(Caption)`
  color: ${({ theme }) => theme.colors.redBlack};
  margin-left: 8px;
`;
