import type { User } from "../types/User";

export const useUsers = () => {
  const apiUrl = "http://localhost:3000/api/users";

  const getAllUsers = async () => {
    const response = await fetch(`${apiUrl}/all`);
    const data = await response.json();

    return data;
  };

  const createUser = async (newUser: { user: User }) => {
    await fetch(`${apiUrl}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
  };

  const updateUser = async (updatedUser: { user: User }) => {
    await fetch(`${apiUrl}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });
  };

  const deleteUser = async (id: number) => {
    await fetch(`${apiUrl}/delete/${id}`, {
      method: "DELETE",
    });
  };

  return { getAllUsers, createUser, updateUser, deleteUser };
};
