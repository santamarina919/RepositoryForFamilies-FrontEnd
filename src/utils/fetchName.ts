

export default function fetchName(email :string){
  return  localStorage.getItem(email + 'name')
}
