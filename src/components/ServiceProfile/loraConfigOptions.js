const dataTypes = [
    {name: 'int', value:"0"},
    {name: 'string', value:"1"},
    {name: 'boolean', value:"2"},
    {name: 'float', value:"3"},
 ] 
const channelTypes = [
    {name: 'Digital', value:"0", params: [], paramsType: null},
    {name: 'Analógico', value:"1", params: [], paramsType: null},
    {name: 'Interrupção', value:"2", params: [], paramsType: null},
    {
        name: 'UART', 
        value:"3",
        params: [
            {name: "300 8N1", value: 0},
            {name: "600 8N1", value: 1},
            {name: "1200 8N1", value: 2},
            {name: "2400 8N1", value: 3},
            {name: "4800 8N1", value: 4},
            {name: "9600 8N1", value: 5},
            {name: "14400 8N1", value: 7},
            {name: "19200 8N1", value: 8},
            {name: "28800 8N1", value: 9},
            {name: "38400 8N1", value: 10},
            {name: "57600 8N1", value: 11},
            {name: "115200 8N1", value: 12},
        ], 
        paramsType: "Configuração"
    },
    {
        name: 'SPI', 
        value:"4",
        params: [
            {name: "SCP1000", value: 0},
            {name: "BME280", value: 1},
            {name: "DS3234", value: 2},
            {name: "DS1306", value: 3},
        ], 
        paramsType: "Dispositivo"
    },
    {
        name: 'I2C', 
        value:"5",
        params: [
            {name: "MPU-6050", value: 0},
            {name: "GY-302", value: 1},
            {name: "DS1307", value: 2},
        ], 
        paramsType: "Dispositivo"
    },
    {
        name: 'GDI', 
        value:"6",
        params: [
            {name: "DHT-11", value: 0},
            {name: "DHT22", value: 1},
            {name: "DS18B20", value: 2},
        ], 
        paramsType: "Dispositivo"
    },
]

const acquisitionMethods = [
    {name: "Leitura única", value:0},
    {name: "Média", value:1},
    {name: "RMS", value:2},

]



module.exports = {
    dataTypes,
    channelTypes,
    acquisitionMethods
}