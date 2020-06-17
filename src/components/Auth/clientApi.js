export const createUser = async (user) => {
  try {
    console.log('user: ', user);

    const rawResponse = await fetch(
      'https://afternoon-falls-25894.herokuapp.com/users',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }
    );

    if (rawResponse.status === 422) {
      throw new Error('Incorrect e-mail or password');
    }

    const content = await rawResponse.json();

    return content;
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (user) => {
  try {
    const rawResponse = await fetch(
      'https://afternoon-falls-25894.herokuapp.com/signin',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }
    );

    if (rawResponse.status === 403) {
      throw new Error('Incorrect e-mail or password');
    }

    const content = await rawResponse.json();

    return content;
  } catch (error) {
    console.error(error);
  }
};
