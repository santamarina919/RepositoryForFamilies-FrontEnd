export function fetchUserType(){
  return localStorage.getItem('userType') ?? 'NOT_LOGGED_IN'
}
