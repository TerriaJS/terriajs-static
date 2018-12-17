import Layout from './Layout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import Editor from 'react-medium-editor'
import mediumStyle from 'medium-editor/dist/css/medium-editor.css'


const PostLink = (props) => (
  <li>
    <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
)

class Index extends React.Component {
  constructor(props) {
   super(props);
   this.state = {text: ''};
   this.handleChange = this.handleChange.bind(this);
 }
 
 handleChange(text, medium){
   this.setState({
     text: text
   })
 }
 
 render(){
   return (<Layout>
     <ul>
       <PostLink id="how-to " title="How to"/>
       <PostLink id="key-features" title="Key Features"/>
       <PostLink id="faq" title="FAQ"/>
     </ul>
     <Editor
           tag="pre"
           text={this.state.text}
           onChange={this.handleChange}
           options={{toolbar: {buttons: ['bold', 'italic', 'underline']}}}
     />
   </Layout>)
 }
}


Index.getInitialProps = async function() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  const data = await res.json()
  console.log(data)
  return {
    data: data
  }
}

export default Index