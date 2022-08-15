export const dataTypes = [
    {name: 'Inteiro', value:0},
    {name: 'Texto', value:1},
    {name: 'Lógico', value:2},
    {name: 'Decimal', value:3},
] 

const UARTParams = [
    {name: "300 8N1", value: 0x0},
    {name: "600 8N1", value: 0x1},
    {name: "1200 8N1", value: 0x2},
    {name: "2400 8N1", value: 0x3},
    {name: "4800 8N1", value: 0x4},
    {name: "9600 8N1", value: 0x5},
    {name: "14400 8N1", value: 0x6},
    {name: "19200 8N1", value: 0x7},
    {name: "28800 8N1", value: 0x8},
    {name: "38400 8N1", value: 0x9},
    {name: "57600 8N1", value: 0xA},
    {name: "115200 8N1", value: 0xB},
]

const SPIParams = [
    {name: "SCP1000", value: 0x10},
    {name: "BME280", value: 0x11},
    {name: "DS3234", value: 0x12},
    {name: "DS1306", value: 0x13},
]

const I2CParams = [
    {name: "MPU-6050", value: 0x20},
    {name: "GY-302", value: 0x21},
    {name: "DS1307", value: 0x22},
]

const GDIParams = [
    {name: "DHT-11", value: 0x30},
    {name: "DHT22", value: 0x31},
    {name: "DS18B20", value: 0x32},
]

const allParams = [
    ...UARTParams,
    ...SPIParams,
    ...I2CParams,
    ...GDIParams
]

export const paramsValueMap = new Map()
for (const param of allParams) {paramsValueMap.set(param.value, param.name)}

const deviceParamType = {name: 'Dispositivo', value: 0}
const configParamType = {name: 'Configuração', value: 1}

export const channelTypes = [
    {name: 'Digital', value:"0", params: [], paramsType: null},
    {name: 'Analógico', value:"1", params: [], paramsType: null},
    {name: 'Interrupção', value:"2", params: [], paramsType: null},
    {
        name: 'UART', 
        value:3,
        params: UARTParams, 
        paramsType: configParamType
    },
    {
        name: 'SPI', 
        value:4,
        params: SPIParams, 
        paramsType: deviceParamType
    },
    {
        name: 'I2C', 
        value:5,
        params: I2CParams, 
        paramsType: deviceParamType
    },
    {
        name: 'GDI', 
        value:6,
        params: GDIParams, 
        paramsType: deviceParamType
    },
]

export const channelTypesValueMap = new Map()
for(const channelType of channelTypes) {channelTypesValueMap.set(channelType.value, channelType.name)}

export const acquisitionMethods = [
    {name: "Leitura única", value:0},
    {name: "Média", value:1},
    {name: "RMS", value:2},

]
export const acquisitionMethodsValueMap = new Map()
for(const acquisitionMethod of acquisitionMethods) {acquisitionMethodsValueMap.set(acquisitionMethod.value, acquisitionMethod.name)}

export const dataTypesValueMap = new Map()
for(const dataType of dataTypes) {dataTypesValueMap.set(dataType.value, dataType.name)}