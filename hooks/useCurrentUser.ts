import useSWR from 'swr'

import fetcher from '@lib/fetcher'

const useCurrentUser = () => {
    const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher);

    if (error) {
        // Gérer l'erreur ici
        console.log('Erreur lors de la récupération des données', error);
      }

    return {
        data,
        error,
        isLoading,
        mutate,
    }
}

export default useCurrentUser;