import * as React from 'react';
import Typography from '@mui/material/Typography';

export default function TextBox() {
    return (
        <div>
            <h1>Bem vindo!</h1>
            <Typography paragraph>
            Com a LoRaWAN Application Platform você pode criar e gerenciar de forma fácil e rápida aplicações com a utilização da tecnologia LoRaWAN.
            </Typography>
            <Typography paragraph>
            Para isso nossa plataforma faz integração com a rede TTN, onde são cadastratos todos os dispositivos e aplicações, 
            e tem suporte ao protocolo de aplicação <b>LoRaWAN-Jean</b>, que traz a funcionalidade de configuração remota dos dispositivos finais.
            </Typography>            
        </div>
    )
}