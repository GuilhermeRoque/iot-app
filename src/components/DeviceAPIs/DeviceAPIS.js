import React from "react";
import { Grid } from "@mui/material";
import PostCard from '../resources/CustomCard/PostCard'

const featuredPosts = [
    {
      title: 'LoRaWAN-Jean',
      date: 'Protocolo de aplicação LoRaWAN',
      description:
        'Este protocolo permite configurar ciclos de leituras nas portas de entrada/saída do dispositivo com suporte ao LoRaWAN.',
      image: 'https://pt.farnell.com/wcsstore/ExtendedSitesCatalogAssetStore/cms/asset/images/common/campaign/internet_of_things/lora-logo.jpg',
      imageLabel: '',
      link: "https://wiki.sj.ifsc.edu.br/images/a/ac/TCC290_Jean_Michel_de_Souza_Sant%27Ana.pdf"
    },    
];

export default function DeviceAPIs () {
    return (
            <Grid container spacing={4}>
            {featuredPosts.map((post) => (
                <PostCard key={post.title} post={post} />
            ))}
            </Grid>
      );   
}