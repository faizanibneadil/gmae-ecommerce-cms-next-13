import { getClientSideURL } from '@/utilities/getURL'
import { PayloadSDK } from '@payloadcms/sdk'

export const sdk = new PayloadSDK({
  baseURL: `${getClientSideURL()}/api`,
})