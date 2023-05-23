/**
 * @description gets the language code for the app
 * @param availableLanguages languages available in the app
 * @param browserLanguages languages available in the browser
 * @returns language code for the app

 */
export const getLanguageCode = async (
  availableLanguages: string[],
  browserLanguages: string[]
): Promise<string> => {
  const browserLanguagesCodes = browserLanguages.map((language) => language.substring(0, 2))
  for (const languageCode of browserLanguagesCodes) {
    if (availableLanguages.includes(languageCode)) {
      return Promise.resolve(languageCode)
    }
  }
  return Promise.resolve(availableLanguages[0])
}
