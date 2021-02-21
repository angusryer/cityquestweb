import SignUp from "../../views/componentGroups/SignUp";
import Splash from "../Splash";

export default function Auth() {
	// Bring in atoms that set player details.
	// import auth functions and let <Auth /> be the logic container
	// that return various views depending on user auth state.
	if (noUserAvailable) return <SignUp callback={authWithGoogle} />;
	if (!noUserAvailable) return <SignIn callback={authWithGoogle} />;
	return <Splash />;
}
