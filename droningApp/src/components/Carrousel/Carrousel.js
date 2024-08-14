import { Animated, StyleSheet, View, FlatList } from 'react-native';
import React, { useRef, useState } from 'react';
import CarrouselCard from './CarrouselCard';
import slides from './slides'; // Asegúrate de que la ruta es correcta

const Carrousel = () => {
    const [currentIndex, setCurrentIndex] = useState(1)
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0]?.index); // Asegúrate de definir setCurrentIndex
  }).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View style={styles.container}>
        <View style={{flex:1}}> 
      <FlatList
        data={slides}
        renderItem={({ item }) => <CarrouselCard item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false} // Cambié esto a false para ocultar el indicador
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />
       <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  opacity: currentIndex === index ? 1 : 0.5,
                },
              ]}
            />
          ))}
        </View>
      </View>

    </View>
  );
}

export default Carrousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
   },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#493d8a',
    margin: 4,
  },
});
