const fetchUser = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/auth/profile`,
    {
      credentials: "include", // Important! Allows sending the session cookie
    }
  );

  if (response.ok) {
    return await response.json(); // user data // e.g. { _id, displayName, email }
  } else {
    return null;
  }
};

export default fetchUser;
