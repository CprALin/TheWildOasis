import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register , formState , getValues , handleSubmit} = useForm();
  const { error } = formState;

  function onSubmit(data){
      console.log(data)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={error?.full_name?.message}>
        <Input type="text" id="full_name" {...register('full_name' , {required : 'This field is required'})}/>
      </FormRow>

      <FormRow label="Email address" error={error?.email?.message}>
        <Input type="email" id="email" {...register('email' , {required : 'This field is required' , pattern : {
            value : /\S+@\S+\.\S+/,
            message : 'Please provide a valid email address'
        }})}/>
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={error?.password?.message}>
        <Input type="password" id="password" {...register('password' , {required : 'This field is required' , minLength : {
            value : 8,
            message : 'Password needs a minimum of 8 characters'
        }})}/>
      </FormRow>

      <FormRow label="Repeat password" error={error?.password_confirm?.message}>
        <Input type="password" id="password_confirm" {...register('password_confirm' , {required : 'This field is required' , validate : {
            validate : (value) => value === getValues().password || 'Password need to match'
        }})}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
