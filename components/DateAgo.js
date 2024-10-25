import { formatDistanceToNow } from 'date-fns';

const DateAgo = ({ date }) => {
  return formatDistanceToNow(date);
};

export default DateAgo;