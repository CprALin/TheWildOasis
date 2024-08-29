import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { createEditCabin } from "../../services/apiCabins";
import { useForm } from "react-hook-form";


function CreateCabinForm({cabinToEdit = {}}) {
  const { id : editId , ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register , handleSubmit , reset , getValues , formState } = useForm({
      defaultValues : isEditSession ? editValues : {} 
  });
  const queryClient = useQueryClient();
  const {errors} = formState;
  
  const {mutate : createCabin, isLoading : isCreating} = useMutation({
      mutationFn : createEditCabin,
      onSuccess : () => {
          toast.success('New cabin successfully created');
          queryClient.invalidateQueries({ queryKey : ["cabin"] });
          reset();
      },
      onError : (err) => toast.error(err.message)
  })

  const {mutate : editCabin , isLoading : isEditing} = useMutation({
    mutationFn : ({newCabinData , id}) => createEditCabin(newCabinData , id),
    onSuccess : () => {
        toast.success('Cabin successfully edited.');
        queryClient.invalidateQueries({ queryKey : ["cabin"] });
        reset();
    },
    onError : (err) => toast.error(err.message)
  })

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
      const image = typeof data.image === 'string' ? data.image : data.image[0] 
    
      if(isEditSession) editCabin({newCabinData : {...data , image} , id : editId});
      else createCabin({...data , image : image});
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
        <Input type="number" id="max_capacity" disabled={isWorking} {...register("max_capacity" , { 
          required : "This field is required" , 
          min : { 
            value : 1 , 
            message : "Capacity should be at least 1" 
          }
        })}/>
      </FormRow>

      <FormRow label="regular_price" error={errors?.regular_price?.message}>
        <Input type="number" id="regular_price" disabled={isWorking} {...register("regular_price" , { required : "This field is required"})}/>
      </FormRow>
     
      <FormRow label="discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" disabled={isWorking} defaultValue={0} {...register("discount" , { 
            required : "This field is required" ,
            validate : (value) => value <= getValues().regular_price || 'Discount should be less than regular price'
         })}/>
      </FormRow>

      <FormRow label="description" error={errors?.description?.message}>
        <Textarea type="number" id="description" disabled={isWorking} defaultValue="" {...register("description" , { required : "This field is required"})}/>
      </FormRow>

      <FormRow label="image">
        <FileInput id="image" accept="image/*" type="file" {...register("image" , { required : isEditSession ? false : "This field is required"})}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? "Edit cabin" : "Create new cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

CreateCabinForm.propTypes = {
  cabinToEdit: PropTypes.shape({
    id: PropTypes.number,  // or string depending on the type of id
    name: PropTypes.string,
    max_capacity: PropTypes.number,
    regular_price: PropTypes.number,
    discount: PropTypes.number,
    description: PropTypes.string,
    image: PropTypes.string,  // Assuming the image is a URL or a file name
  }),
};
