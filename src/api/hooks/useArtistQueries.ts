import { useQuery } from '@tanstack/react-query';
import { artistAndArtworkData } from 'src/screens/data';

const fetchArtistData = async (artistId: number) => {
  // 특정 artistId에 해당하는 데이터를 반환
  const artistData = artistAndArtworkData.find(
    (item) => item.artist.id === artistId,
  );

  if (artistData) {
    const { artist, artworks } = artistData;
    return { artist, artworks };
  } else {
    throw new Error('Artist not found');
  }
};

export const useArtistData = (artistId: number) => {
  const { data, ...queryInfo } = useQuery({
    queryKey: ['artist', artistId],
    queryFn: () => fetchArtistData(artistId),
  });

  return {
    artist: data?.artist,
    artworks: data?.artworks,
    ...queryInfo,
  };
};
