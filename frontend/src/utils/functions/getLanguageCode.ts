/**
 * @description Returns the language code of the browser language code or the first available language code if the browser language code is not available
 * @param availableLanguages languages available in the app
 * @param browserLanguageCode language code of the browser
 * @returns language code
 */
export const getLanguageCode = async (
  availableLanguages: string[],
  browserLanguageCode: string
): Promise<string> => {
  const browserLanguageCodeShort = browserLanguageCode.split('-')[0].toLowerCase()
  if (availableLanguages.includes(browserLanguageCode)) {
    return Promise.resolve(browserLanguageCode)
  } else if (availableLanguages.includes(browserLanguageCodeShort)) {
    return Promise.resolve(browserLanguageCodeShort)
  } else {
    return Promise.resolve(availableLanguages[0])
  }
}
