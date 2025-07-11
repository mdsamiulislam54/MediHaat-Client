import axiosinstance from "../axiosInstance/axiosinstance";
const axiosinstanc = axiosinstance();

export const createUserIfNotExists = async (user) => {
  try {
    const res = await axiosinstanc.get(`/user/${user.email}`);

    if (res.data) {
      // already exists
      return res.data.role;
    }
  } catch (error) {
    if (error.response?.status === 404) {
      // not found — create new user
      const newUser = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: ["user"],
      };
      const createRes = await axiosinstanc.post("/create-user", newUser);
      return createRes.data.role;
    } else {
      console.error("Error checking/creating user:", error);
    }
  }
};
