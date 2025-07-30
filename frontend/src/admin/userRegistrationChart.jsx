import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const UserRegistrationChart = ({ data }) => {
  // Format the API response for Recharts
  const formattedData = data.map(item => {
    const formattedDate = item._id
      ? new Date(item._id).toLocaleDateString("en-US", { month: "short", day: "numeric" }) // Converts to "Mar 15"
      : "Unknown";

    return {
      date: formattedDate,
      data: item.count,
    };
  });

  return (
    <ResponsiveContainer width="95%"  height={300}>
      <AreaChart data={formattedData}>
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" />
        <Area type="monotone" dataKey="data" stroke="rgba(0,0,255,0.5)" fill="rgba(0,0,255,0.2)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default UserRegistrationChart;
