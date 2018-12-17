import fetch from 'isomorphic-unfetch';

const fetchData = async function() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  const data = await res.json()
  console.log(data)
  return {
    data: data.title
  }
}

export default fetchData;