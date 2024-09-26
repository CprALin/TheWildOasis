import PropTypes from 'prop-types';
import Stat from "./Stat";
import { HiCalendarDays, HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineChartBar } from 'react-icons/hi2';

export default function Stats({bookings , confirmedStays}){
    const numBookings = bookings.length;

    return(
        <>
          <Stat title='Bookings' color='blue' icon={<HiOutlineBriefcase />} value={numBookings}/>
          <Stat title='Sales' color='green' icon={<HiOutlineBanknotes/>} value={numBookings}/>
          <Stat title='Check ins' color='indigo' icon={<HiCalendarDays/>} value={numBookings}/>
          <Stat title='Occupancy rate' color='yellow' icon={<HiOutlineChartBar />} value={numBookings}/>  
        </>
    );
}

Stats.propTypes = {
    bookings: PropTypes.array.isRequired,         
    confirmedStays: PropTypes.array.isRequired,   
  };