import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSettings } from './useSettings';
import Spinner from '../../ui/Spinner';

function UpdateSettingsForm() {
  const { isLoading , settings : { 
      min_booking_length, 
      max_booking_length, 
      max_guests_nr,  
      breakfast_price
  } = {}} = useSettings();

  if(isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' defaultValue={min_booking_length} />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' defaultValue={max_booking_length}/>
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' defaultValue={max_guests_nr}/>
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' defaultValue={breakfast_price}/>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
