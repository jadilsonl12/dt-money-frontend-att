import { Input } from "../Form/Input";
import { TransactionSwitcher } from "../TransactionSwitcher";
import { ITransaction } from "@/types/transaction";
import { yupResolver } from "@hookform/resolvers/yup";
import { date, number, object, string } from "yup";
import {
  useForm,
  Controller,
  useWatch,
} from 'react-hook-form';

// Validação do formulário
const transactionSchema = object({
  title: string()
    .required('O campo título é obrigatório')
    .min(5, 'O título deve ter no mínimo 5 caracteres'),
  type: string()
    .oneOf(['income', 'outcome'], 'O campo tipo deve ser "income" ou "outcome"')
    .required('O campo tipo é obrigatório'),
  price: number().positive('O preço deve ser maior que zero').required('O campo preço é obrigatório'),
  category: string().required('O campo categoria é obrigatório'),
  data: date().default(() => new Date()),
})

// Valores padrão do formulário
const transactionDefaultValues: ITransaction = {
  title: '',
  type: 'income',
  price: 0,
  category: '',
  data: new Date()
}

export interface IFormModalProps {
    formTitle: string;
    closeModal: () => void;
    AddTransaction: (transaction: ITransaction) => void;
}


export function FormModal({formTitle, closeModal, AddTransaction}: IFormModalProps){
  
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors } } = useForm<ITransaction>({
        defaultValues: transactionDefaultValues,
        resolver: yupResolver(transactionSchema)
    });


    const onSubmit = async (formData: ITransaction) => {
      AddTransaction(formData);
      closeModal();
    }

    const handleChangeType = (type: "income" | "outcome") => {
      setValue("type", type);
    }

    // Observa o valor do campo "type"
    const type = useWatch({
      control,
      name: 'type',
      defaultValue: 'income', // valor padrão, se necessário
    });

    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true"> 
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">     
      <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        {/* Botão de fechamento "X" */}
        <button 
          type="button" 
          className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-gray-600" 
          onClick={closeModal}
          aria-label="Fechar">
          <span className="text-2xl">&times;</span>
        </button>
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">            
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h1 className="font-semibold leading-9 text-title text-2xl" id="modal-title">{formTitle}</h1>              
            </div>
          </div>
        </div>
        <form className="flex flex-col gap-4 px-12 mt-4 mb-6" onSubmit={handleSubmit(onSubmit)}>            
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input type="text" placeholder="Título" {...field} />
              )}
            />
            {errors.title && <span className="text-red-500 text-sm">{errors.title?.message}</span>}
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <Input type="number" placeholder="Preço" {...field}/>
              )}
            />            
            {errors.price && <span className="text-red-500 text-sm">{errors.price?.message}</span>}
            <TransactionSwitcher setType={handleChangeType} type={type}/>
            {errors.type && <span className="text-red-500 text-sm">{errors.type?.message}</span>}
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Input type="text" placeholder="Categoria" {...field}/>            
              )}
            />            
            {errors.category && <span className="text-red-500 text-sm">{errors.category?.message}</span>}
            <div className="bg-gray-50 px-12 py-3 flex sm:flex-row-reverse w-full mb-16">          
            <button type="submit" className="mt-3 w-full justify-center rounded-md bg-income-value text-white px-3 py-5 text-normal font-semibold shadow-sm hover:opacity-80 sm:mt-0">Confirmar</button>
            </div>
        </form>
        
      </div>
    </div>
  </div>
</div>
    )
}