const getUserWord = async (wordId) => {
        const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${localStorage.userId}/words/${wordId}`, {
            method: 'GET',
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${localStorage.token}`,
                'Accept': 'application/json',
            },
        });
        const content = await rawResponse.json();
        return content
    };
  
  export { getUserWord as default };
  