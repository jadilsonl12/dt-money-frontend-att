import { ApiTransaction } from "@/app/services/transaction"
import { useMutation, useQueryClient, useQuery } from "react-query"

const QUERY_KEY =  'qkTransaction'


const Create = () => {
    const queryClient = useQueryClient()

    return useMutation(ApiTransaction.create, {
        onSuccess: () => {
            queryClient.invalidateQueries(QUERY_KEY)
        }
    })
}

const ListAll = () => {
    return useQuery([QUERY_KEY], () => ApiTransaction.listAll())
}

const Delete = () => {
    const queryClient = useQueryClient()

    return useMutation(ApiTransaction.delete, {
        onSuccess: () => {
            queryClient.invalidateQueries(QUERY_KEY)
        }
    })
}

const Update = () => {
    const queryClient = useQueryClient()

    return useMutation(ApiTransaction.update, {
        onSuccess: () => {
            queryClient.invalidateQueries(QUERY_KEY)
        }
    })
}
  
  export const useTransaction = {
      Create,
      ListAll,
      Update, 
      Delete
}