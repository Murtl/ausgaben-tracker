import { useI18nStore } from '@/stores/i18nStore'

/**
 * @description All months in a year
 */
export const monthsConstant = () => {
  const i18n = useI18nStore().i18n
  return [
    i18n.january,
    i18n.february,
    i18n.march,
    i18n.april,
    i18n.may,
    i18n.june,
    i18n.july,
    i18n.august,
    i18n.september,
    i18n.october,
    i18n.november,
    i18n.december
  ]
}

/**
 * @description Sort options for the dropdown in the diagrams
 */
export const sortByMonthOrYearOptions = () => {
  const i18n = useI18nStore().i18n
  return [i18n.months, i18n.years]
}
