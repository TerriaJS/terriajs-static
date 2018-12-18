import Layout from './Layout.js';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import fetchData from '../helpers/fetchData';
import saveData from '../helpers/saveData';
import Editor from 'react-mde';
import Showdown from "showdown";
import 'draft-js/dist/Draft.css';
import "react-mde/lib/styles/css/react-mde-all.css";



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
   this.state = {
     value: '',
     editingMode: false
   };
   this.handleChange = this.handleChange.bind(this);
   this.handleSave = this.handleSave.bind(this);
   this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true
    });
 }
 
 componentDidMount(){
   this.setState({
     value: this.props.value
   })
 }
 
 enterEditingMode(){
   this.setState({editingMode: true})
 }
 
 handleChange(value){
   this.setState({ value });
 }
 
 handleSave(){
   this.setState({ editingMode: false });
 }
 
 renderContent(){
   if(this.state.editingMode){
     return (<div>
       <Editor
       onChange={this.handleChange}
       value={this.state.value}
       generateMarkdownPreview={markdown =>
         Promise.resolve(this.converter.makeHtml(markdown))
     }/>
     <button onClick={this.handleSave}>Save</button>
     </div>)
   } else {
     return <div>{this.state.value}</div>
   }
 }
 
 render(){
   return (<Layout>
     <ul>
       <PostLink id="how-to " title="How to"/>
       <PostLink id="key-features" title="Key Features"/>
       <PostLink id="faq" title="FAQ"/>
     </ul>
     <h1>About National Map</h1>
     {!this.state.editingMode && <button onClick={this.enterEditingMode.bind(this)}>Edit</button>}
     
     {this.renderContent()}
     
     
     
   </Layout>)
 }
}


Index.getInitialProps = fetchData;

export default Index