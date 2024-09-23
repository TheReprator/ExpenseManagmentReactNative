import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../utils/theme/typography'

const AppLogo = () => {
    return (
        <View style={styles.LogoContainer}>
            <Image source={require('../assets/images/app_logo.png')} style={styles.Logo} />
            <Text style={styles.LogoText}>Accountbook</Text>
        </View>
    )
}

export default AppLogo

const styles = StyleSheet.create({
    LogoContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        padding: SPACING.space_8,
        columnGap: SPACING.space_8
    },
    Logo: {
        height: SPACING.space_40,
        width: SPACING.space_40,
    },
    LogoText: {
        fontWeight:'bold',
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_24,
        color: COLORS.secondaryBlackRGBA,
    },
})