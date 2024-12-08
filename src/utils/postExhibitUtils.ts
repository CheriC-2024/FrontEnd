import { Artwork } from 'src/interfaces/collection';

interface PostDataInput {
  exhibitTitle: string;
  exhibitDescription: string;
  selectedFont: string;
  selectedThemes: string[];
  selectedArtworks: Artwork[];
  artworkInfoInput: any[];
  selectedCoverImage?: string;
  selectedGradientConfig?: {
    colors: string[];
    key: string;
  };
}

export const preparePostData = ({
  exhibitTitle,
  exhibitDescription,
  selectedFont,
  selectedThemes,
  selectedArtworks,
  artworkInfoInput,
  selectedCoverImage,
  selectedGradientConfig,
}: PostDataInput) => {
  return {
    name: exhibitTitle,
    description: exhibitDescription,
    font: selectedFont,
    fontColor: 'WHITE',
    themes: selectedThemes,
    exhibitionArtReqs: selectedArtworks.map((artwork, index) => ({
      description: artworkInfoInput[index]?.artworkDescription || '',
      reasonForPurchase: artworkInfoInput[index]?.artworkValue || '',
      review: artworkInfoInput[index]?.artworkAppreciation || '',
      artId: artwork.artId,
    })),
    coverImgUrl: selectedCoverImage || null,
    colors: selectedCoverImage ? null : selectedGradientConfig?.colors || null,
    exhibitionBackgroundType: selectedCoverImage
      ? null
      : selectedGradientConfig?.key || 'TOP_DOWN',
  };
};
