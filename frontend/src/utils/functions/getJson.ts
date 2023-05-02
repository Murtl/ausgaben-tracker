/**
 * @description fetches a json file from the given url
 * @param p_url url to fetch from
 * @returns json object
 */
export const getJson = async (p_url: string) => {
  return fetch(p_url).then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error(`'${response.url}' not found`)
    }
  })
}
