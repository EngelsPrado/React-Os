import React from 'react';
import ReactDOM from 'react-dom';
import Froalaeditor from 'froala-editor';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
// Include special components if required.
//  import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
// import FroalaEditorA from 'react-froala-wysiwyg/FroalaEditorA';
// import FroalaEditorButton from 'react-froala-wysiwyg/FroalaEditorButton';
// import FroalaEditorImg from 'react-froala-wysiwyg/FroalaEditorImg';
// import FroalaEditorInput from 'react-froala-wysiwyg/FroalaEditorInput';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import 'froala-editor/js/plugins/image.min.js'
import 'froala-editor/js/plugins/char_counter.min.js'
import 'froala-editor/js/plugins/print.min.js'
import 'froala-editor/js/plugins/colors.min.js'
import 'froala-editor/js/plugins/table.min.js'
import 'froala-editor/js/plugins/code_view.min.js'
import 'froala-editor/js/plugins/emoticons.min.js'

const Editor =()=>{
  
     var config={
        placeholderText: 'Edit!',
        charCounterCount: true,
        autofocus: true,
         codeMirror: true,
        // documentReady: true,
        htmlAllowedTags: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        imageUpload: true,
        // colorsText: ['#61BD6D', '#1ABC9C', '#54ACD2', 'REMOVE'],
        tableCellMultipleStyles: true,
       
      }

    return (
        <div id="froala-editor">
           <FroalaEditorComponent tag='textarea' config={config}/>
           
        </div>

        
    )
}


export default Editor