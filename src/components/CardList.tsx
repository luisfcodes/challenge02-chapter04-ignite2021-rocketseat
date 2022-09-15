import { Grid, GridItem, SimpleGrid, useDisclosure } from '@chakra-ui/react';
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
  const [modalIsOpen, setModalIsOpen] = useState(false)

  // TODO SELECTED IMAGE URL STATE
  const [imageSelected, setImageSelected] = useState('')

  // TODO FUNCTION HANDLE VIEW IMAGE
  function handleViewImage(urlImage: string) {
    setModalIsOpen(true)
    setImageSelected(urlImage)
  }

  return (
    <>
      {/* TODO CARD GRID */}
      <Grid templateColumns='repeat(3, 1fr)' gap={10}>
        {cards && cards.map(element => (
          <GridItem w='100%' h='300px' key={element.id}>
            <Card data={element} viewImage={handleViewImage} />
          </GridItem>
        ))}
      </Grid>

      {/* TODO MODALVIEWIMAGE */}
      {imageSelected && (
        <ModalViewImage isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} imgUrl={imageSelected} />
      )}
    </>
  );
}
