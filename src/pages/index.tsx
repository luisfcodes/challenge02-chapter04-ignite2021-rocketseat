import { Button, Box } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import Head from 'next/head'


export default function Home(): JSX.Element {

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    // TODO AXIOS REQUEST WITH PARAM
    async ({ pageParam = null }) => {
      const response = await api.get('images', {
        params: {
          after: pageParam
        }
      })
      return response
    }
    ,
    // TODO GET AND RETURN NEXT PAGE PARAM
    {
      getNextPageParam: (response) => {
        return response.data.after ? response.data.after : null
      }
    }
  );

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    if (data) {
      const user = data.pages.map(item => {
        return item.data.data
      })
      return user.flat(1)
    }

  }, [data]);

  // TODO RENDER LOADING SCREEN
  if (isLoading) {
    return (
      <Loading />
    )
  }

  // TODO RENDER ERROR SCREEN
  if (isError) {
    return (
      <Error />
    )
  }

  return (
    <>

      <Head>
        <title>upfi | Home</title>
      </Head>

      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />

        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
        { hasNextPage && (
          <Button onClick={() => fetchNextPage()}>
            { isFetchingNextPage ? 'Carregando...' : 'Carregar mais' }
          </Button>
        ) }
      </Box>
    </>
  );
}
