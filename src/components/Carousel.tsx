import React, { FC, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  View,
  ViewToken,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, {  useAnimatedRef} from 'react-native-reanimated';
import { COLORS } from '../utils/theme/typography';

const { width } = Dimensions.get('window');

const BORDER_RADIUS = 20;

export interface ImageCarouselProps {
  data: ImageCarouselItem[];
  pageChangeCallback: (index: number) => void
}

const HorizontalSeparatorComponent = () => {
  return <View
    style={{
      width: 10,
    }}
  />;
}

const CarouselImageComponent = ({ imageUrl }: { imageUrl: string }) => {

  const [isImageLoading, setImageLoading] = useState<boolean>(true)

  return (

    <View style={styles.itemImageContainer}>

      <View>
        <FastImage
          style={[styles.itemImage, { opacity: isImageLoading ? 0 : 1 }]}
          source={{
            uri: imageUrl
          }}
          resizeMode={FastImage.resizeMode.stretch}
          onLoadStart={() => {
            console.log("imageLogCarousel, load started")
            setImageLoading(true)
          }}
          onLoadEnd={() => {
            console.log("imageLogCarousel, load end")
            setImageLoading(false)
          }}
          onError={() => {
            console.log("imageLogCarousel, load failed")
          }}
        />
        {
          isImageLoading && <ActivityIndicator style={{
            width: '100%',
            height: '100%', position: 'absolute'
          }} size="large" color={COLORS.primaryRedHex} />
        }
      </View>
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