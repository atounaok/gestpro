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
   console.log("Creating task")
}

