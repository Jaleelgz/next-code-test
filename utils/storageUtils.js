const getAllUsersFromStorage = () => {
  const usersRes = localStorage.getItem("users");

  return usersRes ? JSON.parse(usersRes) : [];
};

const setAllUsersToStorage = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

const addUserToStorage = (user) => {
  let allUsers = getAllUsersFromStorage();

  allUsers.push(user);

  setAllUsersToStorage(allUsers);
};

const deleteUserFromStorage = (user) => {
  let allUsers = getAllUsersFromStorage();

  const newUserList = allUsers.filter(
    (userItem) => userItem.phone !== user.phone
  );

  setAllUsersToStorage(newUserList);
};

export {
  getAllUsersFromStorage,
  setAllUsersToStorage,
  addUserToStorage,
  deleteUserFromStorage,
};
