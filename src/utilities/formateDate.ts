import dayjs from "dayjs";

export const formatUnixDate = (timestamp: number ) =>
  dayjs.unix(timestamp).format("DD/MM/YYYY hh:mm A");
