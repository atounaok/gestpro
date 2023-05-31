export const createProject = async (data) => fetch('/api/project/create', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});