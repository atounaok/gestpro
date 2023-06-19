// Pour créer une nouvelle liste dans un projet
export const createList = async (data: any) => {
    await fetch('/api/workspace/list/create', {
       method: 'POST',
       body: JSON.stringify(data),
       headers: {
           'Content-Type': 'application/json',
           Accept: 'application/json',
       },
       
   });
}

//Pour Obtenir les listes
export const getAllLists = async (projectId: string) => {
    try {
        const res: any = await fetch(`/api/workspace/list/getAll?projectId=${projectId}`);

        if(!res.ok){
            throw new Error('Une erreur est subvenue lors de la récupération des listes')
        }
        const data = await res.json();

        return data;
    } catch (error) {
        console.log('Erreur dans getLists:' + error)
    }
}


