

const ID_KEY = 'myId'

export function fetchSelfId(){
  const id = localStorage.getItem(ID_KEY) as string | null
  return id
}

export function saveSelfId(email :string){
  localStorage.setItem(ID_KEY,email)
}
