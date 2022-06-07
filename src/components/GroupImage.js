import {
    View,
    Image,
    StyleSheet,
    ImageBackground,
  } from 'react-native'
  
  import React from 'react'
  
  const GroupImage = props => {
      const {images = [], displayOnly, background, width = 48, style} = props
      const num = displayOnly || images.length
      const computedStyle = StyleSheet.flatten([
        { width: width, height: width, overflow: 'hidden', flexDirection: 'row' },
        style
      ])

      const finalWidth = computedStyle.width
      computedStyle.height = computedStyle.width
      computedStyle.borderRadius = computedStyle.borderRadius || finalWidth / 2
  
      const div = finalWidth / 2
      const styles = StyleSheet.create({
        container: computedStyle,
        twoContainer: {
          width: div, overflow: 'hidden'
        },
        fourContainer: {
          width: div, height: div
        }
      })
      if (num == 0){
        return <Image style={styles.container} source={background} />
      }
  
      if (num === 1){
        return <ImageBackground style={styles.container} source={background}>
          <Image style={{width, height: width}} source={{uri:images[0]}} />
        </ImageBackground>
      }
  
      if (num === 2){
        return <ImageBackground style={styles.container} source={background}>
          <View style={styles.twoContainer}>
            <Image style={{marginRight: div / 2, left: 0, width, height: width}} source={{uri:images[0]}} />
          </View>
          <View style={styles.twoContainer}>
            <Image style={{marginLeft: div / 2, right: div, width, height: width}} source={{uri:images[1]}} />
          </View>
        </ImageBackground>
      }
  
      if (num === 3){
        return <ImageBackground style={styles.container} source={background}>
          <View style={styles.twoContainer}>
            <Image style={{marginRight: div / 2, left: 0, width, height: width}} source={{uri:images[0]}} />
          </View>
          <View style={styles.twoContainer}>
            <Image style={styles.fourContainer} source={{uri:images[1]}} />
            <Image style={styles.fourContainer} source={{uri:images[2]}} />
          </View>
        </ImageBackground>
      }
  
      return <ImageBackground style={styles.container} source={background}>
        <View>
          <Image style={styles.fourContainer} source={{uri:images[0]}} />
          <Image style={styles.fourContainer} source={{uri:images[1]}} />
        </View>
        <View>
          <Image style={styles.fourContainer} source={{uri:images[2]}} />
          <Image style={styles.fourContainer} source={{uri:images[3]}} />
        </View>
      </ImageBackground>
    }
  
  export default GroupImage