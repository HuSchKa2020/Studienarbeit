//export const ROOT_URL = "http://localhost:5000";
export const ROOT_URL = "http://3.137.201.169:5001";

// Login und Registrierung
export const URL_POST_LOGIN = ROOT_URL + "/user/login";
export const URL_GET_USER = ROOT_URL + "/user/";
export const URL_GET_USER_BERECHTIGUNGEN = ROOT_URL + "/user/berechtigungen";
export const URL_GET_LOGOUT = ROOT_URL + "/user/logout";

// fehler
export const URL_GET_FEHLERSUCHE = ROOT_URL + "/fehler";
export const URL_POST_FEHLERERSTELLEN = ROOT_URL + "/fehler";
export const URL_GET_ID_FEHLERSUCHE = ROOT_URL + "/fehler/";
export const URL_DELETE_FEHLERLOESCHEN = ROOT_URL + "/fehler/";
export const URL_PUT_FEHLERBEARBEITEN= ROOT_URL + "/fehler/";

//SOFTWARE
export const URL_GET_SOFTWARE = ROOT_URL + "/software";
export const URL_POST_SOFTWARE = ROOT_URL + "/software";
export const URL_PUT_SOFTWARE = ROOT_URL + "/software";

//ANWENDER
export const URL_GET_ANWENDER = ROOT_URL + "/anwender";
