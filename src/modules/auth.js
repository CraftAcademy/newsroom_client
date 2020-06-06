import JtockAuth from "j-tockauth";

const auth = new JtockAuth({
  host: "http://localhost:3000",
  prefixUrl: "/api",
  debug: false,
});

const persistLogin = async (setAuthenticated, setUid) => {
  if (localStorage.hasOwnProperty("J-tockAuth-Storage")) {
    const tokenParams = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
    try {
      const response = await auth.validateToken(tokenParams);
      setAuthenticated(response.success);
      setUid(response.data.uid);
    } catch (error) {
      console.log(error);
    }
  }
};

export { auth, persistLogin };
