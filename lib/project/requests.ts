export const createProject = async (data: any) => {
     await fetch('/api/workspace/project/create', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        
    });
}

export const getAllProjects = async (userId: string) => {
    try {
        const res = await fetch(`/api/workspace/project/getAll?userId=${userId}`);

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
        const res = await fetch(`/api/workspace/project/getById?id=${id}`);

        if(!res.ok){
            throw new Error('Une erreur est subvenue lors de la récupération des projets')
        }
        
        return res.json();
    } catch (error) {
        console.log('Erreur dans getProjects:' + error)
    }
}

export const getProjectByName = async (userId: any, name: any) => {
    try {
        const res = await fetch(`/api/workspace/project/getByName?userId=${userId}&&name=${name}`);

        if(!res.ok){
            throw new Error('Une erreur est subvenue lors de la récupération des projets')
        }
        
        return res.json();
    } catch (error) {
        console.log('Erreur dans getProjects:' + error)
    }
}

export const getLastProject = async (userId: any) => {
    try {
        const res = await fetch(`/api/workspace/project/getLast?userId=${userId}`);

        if(!res.ok){
            throw new Error('Une erreur est subvenue lors de la récupération des projets')
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('Erreur dans getProjects:' + error)
    }
}

export const deleteProject = async (projetId: any) => {
    try {
        await fetch(`/api/workspace/project/delete?id=${projetId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
    } catch (error) {
        console.log(error)
    }
}

// Temporary name
export const updateProjectName = async (userId: any, projetId: any, name: string) => {
    try {
        const response = await fetch(`/api/workspace/project/update?id=${projetId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });

        if(!response.ok){
            throw new Error('Erreur lors de la mise à jour du projet')
        }

        return getAllProjects(userId)
    } catch (error) {
        console.log(error)
    }
}




