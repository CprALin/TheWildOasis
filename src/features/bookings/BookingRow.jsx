import styled from "styled-components";
import { format, isToday } from "date-fns";
import PropTypes from 'prop-types';

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye, HiTrash } from "react-icons/hi2";
import Menus from "../../ui/Menus";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    start_date,
    end_date,
    num_nights,
    num_guests,
    total_price,
    status,
    guests: { full_name: guest_name, email },
    cabins: { name: cabin_name },
  },
}) {
  const navigate = useNavigate();
  const { checkout , isCheckingOut} = useCheckout();
  const { deleteBooking , isDeleting } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{cabin_name}</Cabin>

      <Stacked>
        <span>{guest_name}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(start_date))
            ? "Today"
            : formatDistanceFromNow(start_date)}{" "}
          &rarr; {num_nights} night stay
        </span>
        <span>
          {format(new Date(start_date), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(end_date), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(total_price)}</Amount>

      <Modal>
        <Menus.Menu>
              <Menus.Toggle id={bookingId} />
              <Menus.List id={bookingId}>
                    <Menus.Button icon={<HiEye />} onClick={() => navigate(`/bookings/${bookingId}`)}>
                          See details
                    </Menus.Button>
                  {status === 'unconfirmed' &&
                    (<Menus.Button icon={<HiArrowDownOnSquare />} onClick={() => navigate(`/checkin/${bookingId}`)}>
                        Check in
                    </Menus.Button>)}

                  {status === 'checked-in' &&
                    (<Menus.Button icon={<HiArrowUpOnSquare />} onClick={() => checkout(bookingId)} disabled={isCheckingOut}>
                        Check out
                    </Menus.Button>
                  )}

                  <Modal.Open opens="delete">
                      <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
                  </Modal.Open>
              </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
              <ConfirmDelete resourceName="booking" onConfirm={() => deleteBooking(bookingId)} disabled={isDeleting}/>    
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

BookingRow.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    start_date: PropTypes.string.isRequired,
    end_date: PropTypes.string.isRequired,
    num_nights: PropTypes.number.isRequired,
    num_guests: PropTypes.number.isRequired,
    total_price: PropTypes.number.isRequired,
    status: PropTypes.oneOf(['unconfirmed', 'checked-in', 'checked-out']).isRequired,
    guests: PropTypes.shape({
      full_name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
    cabins: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};


export default BookingRow;
