import React, { useEffect, useState } from 'react';
import Instagram from './instagram.js';
import Media from './media.js';

import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';

export default function Feed(props) {
  let defaultProps = {
    className: "",
    classNameLoading: "",
    getFeedFn: Instagram.getFeed,
    limit: 12,
  };

  const [loading, setLoading] = useState(true);
  const [media, setMedia] = useState([]);

  useEffect(() => {
    let imgs = getFeedFn(props.userName);

    setMedia(imgs.slice(0, props.limit));
    setLoading(false);

  }, [])

  return (
    <View>
      { media.map((el, i) => (
        <Image key={i} source={{ uri: el.src }} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: '#009cd8',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // borderWidth: 1,
    // borderColor: 'red',
    width: '100%',
    height: '100%',
  },
});
