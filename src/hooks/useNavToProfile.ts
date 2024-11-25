import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { fetchUserById } from 'src/api/userApi';

const useNavToProfile = () => {
  const navigation = useNavigation();
  const [loadingUserId, setLoadingUserId] = useState<number | null>(null);

  const navigateToProfile = async (userId: number) => {
    setLoadingUserId(userId); // 로딩 중인 사용자 ID 설정
    try {
      const user = await fetchUserById(userId);
      if (user.validateArtist) {
        navigation.navigate('CollectingStack', {
          screen: 'ArtistProfile',
          params: { artistId: userId },
        });
      } else {
        navigation.navigate('HomeStack', {
          screen: 'CollectorProfile',
          params: { collectorId: userId },
        });
      }
    } catch (error) {
      console.error('Error navigating to profile:', error);
    } finally {
      setLoadingUserId(null); // 로딩 완료
    }
  };

  return { navigateToProfile, loadingUserId };
};

export default useNavToProfile;
