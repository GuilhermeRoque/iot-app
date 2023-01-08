import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
  
export default function DeviceLineChart({data}){
  console.log("DeviceLineChart", data)
  return(
        <LineChart
          width={1000}
          height={500}
          data={data}
          // margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          // padding={{ top: 5, right: 20, left: 20, bottom: 5 }}
    >
        <XAxis dataKey="datetime">
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
