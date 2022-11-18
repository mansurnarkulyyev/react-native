import db from "../../firebase/config";

export const authSignUpUser = ({ userName, email, password,}) => async (dispatch, getState) => { 
    try {
        console.log(userName, email, password,);
        const user = await db.auth().createUserWithEmailAndPassword(email, password);
        console.log("user", user);
    } catch (error) {
        console.log("error",error);
        console.log("error.message",error.message);
    }
}; 
export const authSignInUser = () => async (dispatch, getState) => { 
     try {
        console.log(userName, email, password,);
        const user = await db.auth().signInWithEmailAndPassword(email, password);
        console.log("user", user);
    } catch (error) {
        console.log("error",error);
        console.log("error.message",error.message);
    }
}; 
export const authSignOutUser = () => (dispatch,getState) =>{ }; 