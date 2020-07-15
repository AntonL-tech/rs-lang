const updateUserWord = async ({ wordId, word }) => {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${localStorage.userId}/words/${wordId}`, {
        method: 'PUT',
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(word)

    });
    const content = await rawResponse.json();
};
  
  export { updateUserWord as default };
  