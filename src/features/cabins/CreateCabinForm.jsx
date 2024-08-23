import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCabin } from "../../services/apiCabins";
import FormRow from "../../ui/FormRow";


function CreateCabinForm() {
  const { register , handleSubmit , reset , getValues , formState } = useForm();
  const queryClient = useQueryClient();
  const {errors} = formState;
  
  const {mutate , isLoading : isCreating} = useMutation({
      mutationFn : createCabin,
      onSuccess : () => {
          toast.success('New cabin successfully created');
          queryClient.invalidateQueries({ queryKey : ["cabins"] });
          reset();
      },
      onError : (err) => toast.error(err.message)
  })

  function onSubmit(data) {
      mutate(data)
  }

  function onError() {
    /*   console.log(errors); */
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit , onError)}>

      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input type="text" id="name" autoComplete="on" {...register("name" , { required : "This field is required" })}/>
      </FormRow>

      <FormRow label="max_capacity" error={errors?.max_capacity?.message}>
        <Input type="number" id="max_capacity" disabled={isCreating} {...register("max_capacity" , { 
          required : "This field is required" , 
          min : { 
            value : 1 , 
            message : "Capacity should be at least 1" 
          }
        })}/>
      </FormRow>

      <FormRow label="regular_price" error={errors?.regular_price?.message}>
        <Input type="number" id="regular_price" disabled={isCreating} {...register("regular_price" , { required : "This field is required"})}/>
      </FormRow>

      <FormRow label="discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" disabled={isCreating} defaultValue={0} {...register("discount" , { 
            required : "This field is required" ,
            validate : (value) => value <= getValues().regular_price || 'Discount should be less than regular price'
         })}/>
      </FormRow>

      <FormRow label="description" error={errors?.description?.message}>
        <Textarea type="number" id="description" disabled={isCreating} defaultValue="" {...register("description" , { required : "This field is required"})}/>
      </FormRow>

      <FormRow label="image">
        <FileInput id="image" accept="image/*" />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>{isCreating? 'Crating...' : 'Add cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
