import Button from "../../ui/Button";
import PropTypes from "prop-types";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { isCheckingOut , checkout } = useCheckout();

  return (
    <Button $variation="primary" size="small" onClick={() => checkout} disabled={isCheckingOut}>
      Check out
    </Button>
  );
}

export default CheckoutButton;

CheckoutButton.propTypes = {
    bookingId : PropTypes.number
}