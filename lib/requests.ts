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

// Pour créer une nouvelle liste dans un projet
export const createProjectList = async (data: any) => {
    await fetch('/api/project/createListe', {
       method: 'POST',
       body: JSON.stringify(data),
       headers: {
           'Content-Type': 'application/json',
           Accept: 'application/json',
       },
       
   });
}

//Pour Obtenir les listes
export const getProjectsList = async () => {
    try {
        const res = await fetch('/api/project/getProjectList');

        if(!res.ok){
            throw new Error('Une erreur est subvenue lors de la récupération des listes')
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('Erreur dans getProjects:' + error)
    }
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

export const getProjectById = async (id: any) => {
    try {
        const res = await fetch(`/api/project/getById?id=${id}`);

        if(!res.ok){
            throw new Error('Une erreur est subvenue lors de la récupération des projets')
        }
        
        return res.json();
    } catch (error) {
        console.log('Erreur dans getProjects:' + error)
    }
}

export const getLastId = async (userId: any) => {
    try {
        const res = await fetch(`/api/project/getLastId?userId=${userId}`);

        if(!res.ok){
            throw new Error('Une erreur est subvenue lors de la récupération des projets')
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('Erreur dans getProjects:' + error)
    }
}

export const deleteProjects = async (projetId: any) => {
    try {
        await fetch(`/api/project/delete?id=${projetId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        return getProjects()
    } catch (error) {
        console.log(error)
    }
}

export const updateProjectName = async (projetId: any, name: string) => {
    try {
        const response = await fetch(`/api/project/update?id=${projetId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });

        if(!response.ok){
            throw new Error('Erreur lors de la mise à jour du projet')
        }

        return getProjects()
    } catch (error) {
        console.log(error)
    }
}