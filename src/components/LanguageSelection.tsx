import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { COLORS, SPACING } from '../utils/theme/typography'

const LanguageSelection = () => {
    const [icon, setIcon] = useState('caretdown')

    function handleClick() {
        console.log('button pressed')
        let newIcon: string;
        if (icon === 'caretdown')
            newIcon = 'caretup'
        else
            newIcon = 'caretdown'
        setIcon(newIcon)
    }


    return (
        <TouchableOpacity style={styles.languageSelection} onPress={handleClick}>
            <Text style={styles.language}>English</Text>
            <Icon name={icon} size={SPACING.space_18} />
        </TouchableOpacity>
    )
}

export default LanguageSelection

const styles = StyleSheet.create({
    languageSelection: {
        flexDirection: 'row',
        backgroundColor: 'red',
        padding: SPACING.space_4
    },

    language: {
        paddingEnd: SPACING.space_4,
        color: COLORS.primaryBlackHex,
    }
})