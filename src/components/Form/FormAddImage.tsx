import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';
import axios from 'axios';

interface FormAddImageProps {
  closeModal: () => void;
}

type imageProps = {
  url: string;
  title: string;
  description: string
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const formValidations = {
    image: {
      // TODO REQUIRED, LESS THAN 10 MB AND ACCEPTED FORMATS VALIDATIONS
      required: 'Arquivo obrigatório',
      validate: {
        lessThan10MB: value => value[0].size < 10485760 || 'O arquivo deve ser menor que 10MB',
        acceptedFormats: value => { 
          const regExp = /(image)([/])(png|jpeg|gif)/; 
          return regExp.test(value[0].type) || 'Somente são aceitos arquivos PNG, JPEG e GIF'
        }
      }
    },
    title: {
      // TODO REQUIRED, MIN AND MAX LENGTH VALIDATIONS
      required: 'Título obrigatório',
      minLength: {
        value: 2,
        message: 'Mínimo de 2 caracteres' 
      },
      maxLength: {
        value: 20,
        message: 'Máximo de 20 caracteres' 
      },
    },
    description: {
      // TODO REQUIRED, MAX LENGTH VALIDATIONS
      required: 'Descrição obrigatória',
      maxLength: {
        value: 65,
        message: 'Máximo de 65 caracteres' 
      },
    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    // TODO MUTATION API POST REQUEST,
    async (image: imageProps) => {
      const response = await api.post('images', {
        image: {
          url: image.url,
          title: image.title,
          description: image.description
        }
      })

      return response.data.image
    },
    {
      // TODO ONSUCCESS MUTATION
      
    }
  );

  const {
    register,
    handleSubmit,
    reset,
    formState,
    setError,
    trigger,
  } = useForm();
  const { errors } = formState;

  const onSubmit = async (data: Record<string, unknown>): Promise<void> => {
    try {
      //const uploadImage = await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}image=${data.image[0]}`)
      
      
      // const uploadImage = await fetch('https://api.imgbb.com/1/upload', {
      //   method: 'POST',
      //   headers: {
      //     "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Credentials": "true",
      // "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
      // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      //   },
      //   body: JSON.stringify({
      //     key: process.env.NEXT_PUBLIC_IMGBB_API_KEY,
      //     image: data.image
      //   }),
      // })
      // TODO SHOW ERROR TOAST IF IMAGE URL DOES NOT EXISTS
      // TODO EXECUTE ASYNC MUTATION
      // TODO SHOW SUCCESS TOAST
    } catch {
      // TODO SHOW ERROR TOAST IF SUBMIT FAILED
    } finally {
      // TODO CLEAN FORM, STATES AND CLOSE MODAL
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          // TODO SEND IMAGE ERRORS
          // TODO REGISTER IMAGE INPUT WITH VALIDATIONS
          error={errors.image}
          {...register('image', formValidations.image)}
        />

        <TextInput
          placeholder="Título da imagem..."
          // TODO SEND TITLE ERRORS
          // TODO REGISTER TITLE INPUT WITH VALIDATIONS
          error={errors.title}
          {...register('title', formValidations.title)}
        />

        <TextInput
          placeholder="Descrição da imagem..."
          // TODO SEND DESCRIPTION ERRORS
          // TODO REGISTER DESCRIPTION INPUT WITH VALIDATIONS
          error={errors.description}
          {...register('description', formValidations.description)}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
