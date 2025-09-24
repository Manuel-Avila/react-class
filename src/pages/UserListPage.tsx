import { useEffect, useState } from "react";

import type { User } from "../types/User";
import { useUsers } from "../hooks/useUser";

export default function UserListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const { getAllUsers, createUser, updateUser, deleteUser } = useUsers();

  const fetchUsers = async () => {
    const data = await getAllUsers();
    setUsers(data.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [users]);

  const handleSearch = () => {
    const filteredArray = users.filter(
      (user) =>
        user.email.toLowerCase().includes(email.toLowerCase()) &&
        user.name.toLowerCase().includes(name.toLowerCase())
    );
    setFilteredUsers(filteredArray);
  };

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser = {
      user: { email, name, id: Date.now(), created: new Date().toISOString() },
    };

    await createUser(newUser);
    await fetchUsers();

    clearFields();
  };

  const handleEdit = (user: User) => {
    setIsEditing(true);
    setEmail(user.email);
    setName(user.name);
    setUserId(user.id);
  };

  const handleEditUser = async () => {
    const updatedUser = {
      user: { email, name, id: userId, created: new Date().toISOString() },
    };

    await updateUser(updatedUser);
    await fetchUsers();

    setIsEditing(false);
    clearFields();
  };

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    await fetchUsers();
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    clearFields();
  };

  const clearFields = () => {
    setEmail("");
    setName("");
    setUserId(0);
  };

  return (
    <div className="mt-10 mx-auto p-4 w-[80vw] rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-center">User List</h1>
      <form
        onSubmit={handleCreate}
        className="pt-6 flex flex-col items-center gap-5"
      >
        <input
          type="text"
          placeholder="Email"
          className="border p-2 rounded-md w-8/12"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nombre"
          className="border p-2 rounded-md w-8/12"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {isEditing ? (
          <div className="flex gap-4">
            <button
              onClick={handleEditUser}
              className="bg-blue-600 rounded-2xl text-white p-2 cursor-pointer"
              type="button"
            >
              Actualizar
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-gray-500 rounded-2xl text-white p-2 cursor-pointer"
              type="button"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button
            className="bg-green-600 rounded-2xl text-white p-2 cursor-pointer w-8/12 max-w-50"
            type="submit"
          >
            Guardar
          </button>
        )}

        <button
          onClick={handleSearch}
          className="bg-yellow-600 rounded-2xl text-white p-2 cursor-pointer w-8/12 max-w-50"
          type="button"
        >
          Buscar
        </button>
      </form>
      <div className="mt-5 space-y-3">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="border p-2 border-gray-400 rounded-xl bg-gray-100"
          >
            <p className="font-bold text-lg">{user.name}</p>

            <div className="flex  justify-between items-center">
              <p>
                {user.email} - {user.id}
              </p>
              <div className="space-x-4">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-blue-600 rounded-2xl text-white p-2 cursor-pointer"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-600 rounded-2xl text-white p-2 cursor-pointer"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
