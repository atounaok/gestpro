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