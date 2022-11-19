import db from "../../firebase/config";
import { authSlice } from "./authReducer";

const { authSignOut,updateUserProfile,authStateChange} = authSlice.actions;

export const authSignUpUser = ({ userName, email, password,}) => async (dispatch, getState) => { 
    try {
        // console.log(userName, email, password,);
        await db.auth().createUserWithEmailAndPassword(email, password);

        const user = await db.auth().currentUser;

        await user.updateProfile({
            displayName: userName,
            photoURL: photoURL,
        });

        const {uid,displayName,photoURL,} = await db.auth().currentUser;

          const userUpdateProfile = {
             userId: uid,
            userName: displayName,
            photoURL:photoURL,
            };

        dispatch(updateUserProfile(userUpdateProfile));
        // console.log("user", user);
    } catch (error) {
        console.log("error",error);
        console.log("error.message",error.message);
    }
}; 

export const authSignInUser = ({email,password}) => async (dispatch, getState) => { 
     try {
        // console.log(email, password,);
        const user = await db.auth().signInWithEmailAndPassword(email, password);
        console.log("user", user);
    } catch (error) {
        console.log("error",error);
        console.log("error.message",error.message);
    }
}; 

export const authSignOutUser = () => async (dispatch, getState) => { 
    await db.auth().signOut();
    dispatch(authSignOut());
}; 

export const authStateChangeUser = () => async (dispatch, getState) => {
  await db.auth().onAuthStateChanged((user) => {
    if (user) {
      const userUpdateProfile = {
        userId: user.uid,
            userName: user.displayName,
            photoURL:user.photoURL,
      };

      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdateProfile));
    }
  });
};