// Pour créer une tâche dans une liste
export const createTask = async (data: any) => {
    await fetch('/api/workspace/task/create', {
       method: 'POST',
       body: JSON.stringify(data),
       headers: {
           'Content-Type': 'application/json',
           Accept: 'application/json',
       },
   });
}

export const updateTasktName = async (listId: any, id: any, name: string) => {
    try {
        const response = await fetch(`/api/workspace/task/update?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });

        if(!response.ok){
            throw new Error('Erreur lors de la mise à jour du nom de la tache')
        }

        // return getAllTasks(listId)
    } catch (error) {
        console.log(error)
    }
}

// Temporaire car il faudra liste plus tard
export const getAllTasks = async (projectId: any) => {
    try {
        const res = await fetch(`/api/workspace/task/getAll?projectId=${projectId}`);

        if(!res.ok){
            throw new Error('Une erreur est subvenue lors de la récupération des projets')
        }

        const data = await res.json();

        return data;
    } catch (error) {
        console.log('Erreur dans getProjects:' + error)
    }
}


