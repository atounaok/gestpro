
export const createProject = async (data: any) => {
     await fetch('/api/project/create', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        
    });
}

export const getProjects = async () => {
    try {
        const res = await fetch('/api/project/get');

        if(!res.ok){
            throw new Error('Une erreur est subvenue lors de la récupération des projets')
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('Erreur dans getProjects:' + error)
    }
}

export const getLastId = async (userId: any) => {
    try {
        const res = await fetch(`/api/project/getId?userId=${userId}`);

        if(!res.ok){
            throw new Error('Une erreur est subvenue lors de la récupération des projets')
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('Erreur dans getProjects:' + error)
    }
}