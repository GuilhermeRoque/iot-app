const dataTypes = [
    {name: 'int', value:"0"},
    {name: 'string', value:"1"},
    {name: 'boolean', value:"2"},
    {name: 'float', value:"3"},
 ] 
const channelTypes = [
    {name: 'Digital', value:"0"},
    {name: 'Analógico', value:"1"},
    {name: 'Interrupção', value:"2"},
    {name: 'UART', value:"3"},
    {name: 'SPI', value:"4"},
    {name: 'I2C', value:"5"},
    {name: 'GDI', value:"6"},
]

module.exports = {
    dataTypes,
    channelTypes
}