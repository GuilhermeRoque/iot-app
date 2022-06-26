import React from "react";
import { Grid } from "@mui/material";
import PostCard from "../resources/CustomCard/PostCard";

const featuredPosts = [
    {
      title: 'TTN',
      date: 'The Things Network',
      description:
        'Integração com a rede LoRaWAN aberta The Things Network.\nAtravés da integração com a TTN é possível realizar o cadastro de dispositivos, o envio de mensagens e o recebimento dos dados coletados dos dispositivos cadastrados.',
      image: 'https://www.thethingsnetwork.org/docs/quick-start/TTN-logo.svg',
      imageLabel: '',
      link: "https://www.thethingsnetwork.org/"
    },    
];

export default function Integrations () {
    return (
            <Grid container spacing={4}>
            {featuredPosts.map((post) => (
                <PostCard key={post.title} post={post} />
            ))}
            </Grid>
      );   
}