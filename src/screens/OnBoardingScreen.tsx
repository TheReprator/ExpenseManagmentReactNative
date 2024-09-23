import { StyleSheet, Text, View, Image, ViewStyle, FlatList, Dimensions, Animated, Button, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import AppLogo from '../components/AppLogo';
import { useTranslation } from 'react-i18next';
import LanguageSelection from '../components/LanguageSelection';
import { SPACING } from '../utils/theme/typography';
import ImageCarousel, { ImageCarouselProps } from '../components/Carousel';

const data: ImageCarouselItem[] = [
  {
    id: 0,
    uri: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d'
  },
  {
    id: 1,
    uri: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e',
  },
  {
    id: 2,
    uri: 'https://images.unsplash.com/photo-1651130537842-eec4720ba02c',
  }
];


const PaginationDot = ({ index, paginationIndex }: { index: number, paginationIndex: number }) => {
  return <View style={paginationIndex === index ? style.activeDot : style.inactiveDot} />;
};

const Pagination = ({ data, paginationIndex }: { data: ImageCarouselItem[], paginationIndex: number }) => {
  return (
    <View style={style.paginationContainer}>
      {data.map((_, index) => (
        <PaginationDot index={index} key={index} paginationIndex={paginationIndex} />
      ))}
    </View>
  );
};


const OnBoardingScreen = () => {

  const [currentIndex, setCurrentIndex] = useState<number|null>(null);

  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const toggleState = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <View style={styles.onBoardingContainer(insets)}>

      <View style={style.onBoardingHeader}>
        <AppLogo />
        <LanguageSelection />
      </View>

      <ImageCarousel data={data} pageChangeCallback={toggleState} />


      <View style={style.onBoardingBottomBar}>

        {
          currentIndex !== null && <Pagination paginationIndex={currentIndex} data={data} />
        }

        <Text style={style.onBoardingBottomBarText}>{t('screens.onboarding.text.insturction1')}</Text>
        <Text style={[style.onBoardingBottomBarText, { backgroundColor: 'powderblue' }]}>Hi1</Text>
        <Text style={style.onBoardingBottomBarText} >Hi2</Text>
      </View>
    </View>
  )
}

export default OnBoardingScreen

const styles = {
  onBoardingContainer: (insets: EdgeInsets): ViewStyle => ({
    flex: 1,
    backgroundColor: 'green',
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
    justifyContent: 'space-between',
  })
};

const style = StyleSheet.create({
  onBoardingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: SPACING.space_10
  },

  onBoardingBottomBar: {
    backgroundColor: 'white',
    borderTopStartRadius: SPACING.space_10,
    borderTopEndRadius: SPACING.space_10,
    padding: SPACING.space_10,
  },

  onBoardingBottomBarText: {
    textAlign: 'center',
  },

  paginationContainer: {
    flexDirection: 'row',
    height: 30, // gap between pagination dots and list
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDot: {
    backgroundColor: '#800020', // Burgundy
    height: 8,
    width: 30,
    marginHorizontal: 2,
    borderRadius: 12,
  },
  inactiveDot: {
    backgroundColor: '#D3D3D3', // Light grey
    height: 8,
    width: 8,
    marginHorizontal: 2,
    borderRadius: 12,
  },
});