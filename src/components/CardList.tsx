import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE

  // TODO SELECTED IMAGE URL STATE

  // TODO FUNCTION HANDLE VIEW IMAGE
  function handleViewImage(urlImage: string){
    console.log(urlImage)
  }

  return (
    <>
      {/* TODO CARD GRID */}

      {cards && cards.map(element => (
        <Card data={element} viewImage={handleViewImage} key={element.id}/>
      ))}

      {/* TODO MODALVIEWIMAGE */}
    </>
  );
}
