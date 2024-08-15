import { ITransaction } from "@/types/transaction"
import { DefaultApi } from "../default"

const endpoint = 'app/transaction'
const resourceId = 'id'

export const ApiTransaction =  new DefaultApi<ITransaction>(endpoint, resourceId)