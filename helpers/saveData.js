const saveData = async function(data) {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
    method:'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: data
  })
}

export default saveData;