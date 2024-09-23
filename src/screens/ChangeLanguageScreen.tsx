import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next';

const ChangeLanguageScreen = () => {
  const { t, i18n } = useTranslation(); //i18n instance

  const pressHandler = (language: string) => {
    console.log(language)
    i18n.changeLanguage(language)
  }

  return (
    <View>
      <TouchableOpacity onPress={() => pressHandler("en")}>
        <Text>English</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => pressHandler("hi")}>
        <Text>Hindi</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => pressHandler("ar") }>
        <Text>Arabic</Text>
      </TouchableOpacity>

      <Text style={{ color: 'red' }} > {t("screens.onboarding.text.skip")} </Text>
    </View>
  )
}

export default ChangeLanguageScreen

const styles = StyleSheet.create({})