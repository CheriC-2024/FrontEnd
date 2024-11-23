import { View, ViewStyle } from 'react-native';
import { Subtitle2 } from 'src/styles/typography';
import styled from 'styled-components/native';

interface ArtworkCategoryProps {
  selectedCategories: string[];
  onSelect: (selected: string[]) => void;
  maxSelection?: number;
  required: boolean;
  style?: ViewStyle;
}

const ArtworkCategory: React.FC<ArtworkCategoryProps> = ({
  selectedCategories,
  onSelect,
  maxSelection = 2,
  required = false,
  style,
}) => {
  // 고정된 카테고리 데이터
  const categories = [
    {
      label: '뉴미디어',
      image: require('src/assets/images/SignUpPage/interest1.png'),
      value: 'NEW_MEDIA_ART',
    },
    {
      label: '동양화',
      image: require('src/assets/images/SignUpPage/interest2.png'),
      value: 'ORIENTAL_PAINTING',
    },
    {
      label: '드로잉',
      image: require('src/assets/images/SignUpPage/interest3.png'),
      value: 'DRAWING_ART',
    },
    {
      label: '디자인',
      image: require('src/assets/images/SignUpPage/interest4.png'),
      value: 'DESIGN_ART',
    },
    {
      label: '수채화',
      image: require('src/assets/images/SignUpPage/interest5.png'),
      value: 'WATER_PAINTING',
    },
    {
      label: '유화',
      image: require('src/assets/images/SignUpPage/interest6.png'),
      value: 'OIL_PAINTING',
    },
    {
      label: '판화',
      image: require('src/assets/images/SignUpPage/interest7.png'),
      value: 'PRINTMAKING_PAINTING',
    },
    {
      label: '회화',
      image: require('src/assets/images/SignUpPage/interest8.png'),
      value: 'PAINTING',
    },
  ];

  const handleSelect = (value: string) => {
    const updatedCategories = selectedCategories.includes(value)
      ? selectedCategories.filter((item) => item !== value) // 선택 해제
      : selectedCategories.length < maxSelection
        ? [...selectedCategories, value] // 선택 추가
        : selectedCategories;

    if (updatedCategories.length <= maxSelection) {
      onSelect(updatedCategories); // 부모로 업데이트된 배열 전달
    }
  };

  return (
    <Container style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Label>작품의 미술 분야 (최대 {maxSelection}개)</Label>
        {required && <RequiredMark>*</RequiredMark>}
      </View>
      <Grid>
        {categories.map((category) => (
          <CategoryButton
            key={category.value}
            selected={selectedCategories.includes(category.value)}
            onPress={() => handleSelect(category.value)}
          >
            <ImageBackground source={category.image}>
              <Overlay selected={selectedCategories.includes(category.value)} />
              <CategoryLabel>{category.label}</CategoryLabel>
            </ImageBackground>
          </CategoryButton>
        ))}
      </Grid>
    </Container>
  );
};

export default ArtworkCategory;

const Container = styled.View``;

const Label = styled(Subtitle2)`
  margin-bottom: 4px;
  margin-left: 4px;
`;

const Grid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 8px;
`;

const RequiredMark = styled(Subtitle2)`
  color: ${({ theme }) => theme.colors.cherryRed_10};
  margin-left: 2px;
`;

const CategoryButton = styled.TouchableOpacity<{ selected: boolean }>`
  width: 86px;
  height: 86px;
  border-radius: 50px;
  overflow: hidden;
`;

const ImageBackground = styled.ImageBackground`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.View<{ selected: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.cherryRed_alpha80 : theme.colors.redBlack_alpha40};
`;

const CategoryLabel = styled(Subtitle2)`
  color: #fff;
  z-index: 2;
`;
