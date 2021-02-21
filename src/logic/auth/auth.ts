import firebase from '../../firebaseConfig';
// import { ActivePlayer } from '../../models/player';
import { GameError } from '../error/exceptionLogic';
import { guestPlayer } from '../reducers/playerReducers';

// const formatUserObject = (user: unknown): ActivePlayer => {
//     return {
//         playerId: 
//     } as ActivePlayer
// }

const setActivePlayer = (player: any) => {
    console.log(player)
}

// TODO Move this into context, because it reverses the dependny flow!
export const setupAuthListener = async () => {
        firebase.auth().onAuthStateChanged((user: firebase.User | null): void => {
            if (user) {
                console.log("auth.ts ===> ", user)
                // const authenticatedPlayer: ActivePlayer = formatUserObject(user)
                // setActivePlayer(authenticatedPlayer); // TODO set this in context
            } else {
            setActivePlayer(guestPlayer)
            }
        }, (err: firebase.auth.Error): GameError | void => {
        GameError.logToLocalConsole(err);
        }
    )
} 