import Users from "../model/users.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await Users.getAllUsers();

    if (!allUsers) {
      return res.status(404).json({ message: "No User Found" });
    }

    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsersById = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await Users.findUserById(userId);

        if(!user) {
            return res.status(404).json({ message: "User not found"});
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateUsers = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, password, avatar } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name Required" });
    }

    if (!email) {
      return res.status(400).json({ message: "Email Required" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password Required" });
    }

    const user = await Users.findUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const updateResults = await Users.updateUser(userId, {
      name,
      email,
      password,
      avatar,
    });
    res.status(200).json({
      message: "Update Successfull",
      data: updateResults,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUsers = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await Users.findUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const deleteResult = await Users.deleteUser(userId);
    if (deleteResult === 0) {
      res.status(500).json({ message: "Something went wrong" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user?.userId; 
    
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const user = await Users.findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar || null
    });
  } catch (error) {
    console.error("getCurrentUser error:", error);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};