import React, { FC, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  ViewToken,
} from 'react-native';
import Animated, { scrollTo, useAnimatedRef, useAnimatedScrollHandler, useDerivedValue, useSharedValue } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const BORDER_RADIUS = 20;

export interface ImageCarouselProps {
  data: ImageCarouselItem[];
  pageChangeCallback: (index:number) => void
}

const HorizontalSeparatorComponent = () => {
  return <View
    style={{
      width: 10,
    }}
  />;
}

const CarouselImageComponent = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <View style={styles.itemImageContainer}>
      <Image source={{ uri: imageUrl }} style={styles.itemImage} />
    </View>
  )
}


const ImageCarousel: FC<ImageCarouselProps> = ({ data, pageChangeCallback }) => {
  const ref = useAnimatedRef<Animated.FlatList<string>>();

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const onViewableItemsChanged = ({ viewableItems, changed }: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
    if (viewableItems[0] && viewableItems[0].index !== null) {
      const paginationIndex = viewableItems[0].index % data.length
      pageChangeCallback(paginationIndex)
    }
  };

  const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }]);

  const render = ({ item, index }: { item: ImageCarouselItem, index: number }) => <CarouselImageComponent imageUrl={item.uri} />;

  const separtor = () => <HorizontalSeparatorComponent />;

  return (
    <Animated.FlatList
      ref={ref}
      data={data}
      renderItem={render}
      contentContainerStyle={styles.container}
      keyExtractor={item => item.id.toString()}
      overScrollMode='never'
      snapToAlignment={"center"}
      decelerationRate={"fast"}

      bounces={false}
      showsHorizontalScrollIndicator={false}

      horizontal
      pagingEnabled
      ItemSeparatorComponent={separtor}

      viewabilityConfig={{ itemVisiblePercentThreshold: 100 }}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      removeClippedSubviews
    />
  );
};

export default ImageCarousel;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    borderTopRightRadius: BORDER_RADIUS,
    borderTopEndRadius: BORDER_RADIUS,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopStartRadius: BORDER_RADIUS,
  },
  itemImageContainer: {
    width: width,
    height: '100%',
    padding: 40,
    paddingBottom: 0,
    paddingTop: 20
  },
});