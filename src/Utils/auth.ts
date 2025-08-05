const fetchUser = async () => {
  // const response = await fetch(
  //   `${process.env.REACT_APP_SERVER_URL}/auth/profile`,
  //   {
  //     credentials: "include", // Important! Allows sending the session cookie
  //   }
  // );
  //
  // if (response.ok) {
  //   return await response.json(); // user data // e.g. { _id, displayName, email }
  // } else {
  //   return null;
  // }

  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/auth/profile`,
      {
        credentials: "include",
      }
    );

    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      // Server responded with error status
      const errorText = await response.text();
      console.error("Server error:", errorText);
      return null;
    }

    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      // Unexpected content type
      const text = await response.text();
      console.error("Unexpected response format:", text);
      return null;
    }
  } catch (error) {
    // Network error, JSON parsing error, etc.
    console.error("Fetch failed:", error);
    return null;
  }
};

export default fetchUser;
