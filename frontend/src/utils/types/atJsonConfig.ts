/**
 * @description Type for the config.json file
 */
export type ATJsonConfig = {
  apiLangRoot: string
  apiDbRoot: string
  languages: string[]
  i18n: Record<string, string>
}
