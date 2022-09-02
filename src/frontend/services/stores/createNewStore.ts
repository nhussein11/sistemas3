import publicAxiosInstance from '../../api/axios-api'
type StoreData = {
  name: string
  address: string

}
export const createNewStore = async (store: StoreData) => {
  const response = await publicAxiosInstance.post('/stores', store)
  return response
}
