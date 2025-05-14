import { Card } from "@/components/@ui/Card";
import { styled } from "@edna-ui/react";
import Image from "next/image";

export const Container = styled('div', {
    position: 'relative',
    width: '100%',
    height: '100vh'
})

export const BackgroundImageContainer = styled(Image, {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover'
})

export const FormContainer = styled(Card, {
    position: 'absolute',
    top: 5,
    left: 5,
    zIndex: 1,

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    width: '50%',
    minWidth: '300px',
    height: '98%',


    '@sm': {
        width: '70%'
    }
})