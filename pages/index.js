import Layout from './Layout.js';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Editor from 'react-medium-editor';
import fetchData from '../helpers/fetchData';
import saveData from '../helpers/saveData';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';


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
   this.handleSave = this.handleSave.bind(this);
 }
 
 handleChange(text, medium){
   this.setState({
     text: text
   })
 }
 
 handleSave(){
   saveData(this.state.text)
 }
 
 componentDidMount(){
   this.setState({
     text: this.props.data
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
           text={this.state.text}
           onChange={this.handleChange}
     />
     <button onClick={this.handleSave}>Save</button>
   </Layout>)
 }
}


Index.getInitialProps = fetchData;

export default Index