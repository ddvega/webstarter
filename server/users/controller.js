import { User } from "./userModel.js";

// get users from mongoDB
export const getUser = async (userQuery) => {
  // destructure from userQuery
  const { username, _id } = userQuery;

  if (_id) {
    const name = await User.findById(_id);
    console.log(name);
    return name;
  } 
    const userList = await User.find({ username: { $regex: username } });
    console.log(userList);
    return userList;
  
};

// add users to mongoDB
export const addUser = async (user) => {
  // create user from parameter received
  const newUser = new User;
  newUser._id = user.uid;
  newUser.username = user.username;
  newUser.email = user.email;

  // check if user is already in the database
  // if user already exists, it is likely a third party login.
  // No need to try to add them to the database everytime they login.
  const doesUserExit = await User.exists({ _id: newUser._id });

  if (!doesUserExit) {
    await newUser.save().then((savedDoc) => savedDoc === newUser);
  } else {
    console.log(
      `${newUser.username} with id ${newUser._id} is already in the database. `,
    );
  }
};