import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  ModalCloseButton,
  Box,
  Center,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW={'920px'} bg={'pGray.800'}>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            <Image src={imgUrl} maxW={'900px'} maxH={'600px'}/>
          </Center>
        </ModalBody>
        <ModalFooter alignSelf={'self-start'} p={'0'} marginLeft={'15px'}>
          <Link href={imgUrl} target={'_blank'}>Abrir original</Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </Box>
  )
}
