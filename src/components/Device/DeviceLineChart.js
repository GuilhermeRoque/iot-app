import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

const data = [
    {
      time: '01:00:00',
      value: 4000,
    },
    {
      time: '02:00:00',
      value: 5000,
    },
    {
      time: '03:00:00',
      value: 6000,
    },
    {
      time: '04:00:00',
      value: 4000,
    },
    {
      time: '05:00:00',
      value: 3000,
    },
    {
      time: '06:00:00',
      value: 3000,
    },
    {
      time: '07:00:00',
      value: 5000,
    },
    {
      time: '08:00:00',
      value: 4000,
    },
    {
      time: '09:00:00',
      value: 5000,
    },
    {
      time: '10:00:00',
      value: 6000,
    },
    {
      time: '11:00:00',
      value: 4000,
    },
  ];
  
export default function DeviceLineChart(){
    return(
        <LineChart
          width={600}
          height={400}
          data={data}
          // margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          // padding={{ top: 5, right: 20, left: 20, bottom: 5 }}
    >
        <XAxis dataKey="time">
          {/* <Label value="Horário" offset={5} position="outsideCenter" /> */}
        </XAxis>
        <YAxis>
          {/* <Label value="Valor" offset={5} position="outsideBottom" /> */}
        </YAxis>
        <Tooltip />
        {/* <Legend verticalAlign="top" height={36}/> */}
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="value" stroke="#ff7300" yAxisId={0} />
        </LineChart>
    )
}
