import { View, Text, StyleSheet, ActivityIndicator, Image, Dimensions, TouchableOpacity, Share } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import { useService } from '@/api/service_providers';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { defaultPizzaImage } from '@/components/Listings/serviceItemList';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { defaultStyles } from '@/constants/Styles';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;

const Page = () => {
  const { top } = useSafeAreaInsets();
  const { id: idString } = useLocalSearchParams();
  const navigation = useNavigation();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

  const { data: services, error, isLoading } = useService(id);
 /*  const shareListing = async () => {
    try {
      await Share.share({
        title: listing.name,
        url: listing.listing_url,
      });
    } catch (err) {
      console.log(err);
    }
  }; */

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerTransparent: true,

      headerBackground: () => (
        <Animated.View /* style={[ styles.header]} */></Animated.View>
      ),
      headerRight: () => (
        <View /* style={styles.bar} */>
          <TouchableOpacity /* style={styles.roundButton} */ /* onPress={shareListing} */>
            <Ionicons name="share-outline" size={22} color={'#000'} />
          </TouchableOpacity>
          <TouchableOpacity /* style={styles.roundButton} */>
            <Ionicons name="heart-outline" size={22} color={'#000'} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity /* style={styles.roundButton}  */onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={'#000'} />
        </TouchableOpacity>
      ),
    });
  }, []);
  if (isLoading) {
    return <ActivityIndicator />;
  }
  // loom recording

  if (error || !services) {
    return <Text>Failed to fetch service</Text>;
  }

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Stack.Screen />
      
      <Image 
        source={{ uri: services.image || defaultPizzaImage }} 
        style={styles.image} 
      />
      <Text style={styles.title}>{services.name}</Text>
      <Text>{id}</Text>
      {/* Add more fields from services as needed */}
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  image: {
    width: '100%',
    aspectRatio: 1,   
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
