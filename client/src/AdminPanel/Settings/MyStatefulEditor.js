import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const MyStatefulEditor = ({settingsInfo,setSettingsInfo,generalSettings}) => {
    return (
        <CKEditor
            editor={ClassicEditor}
            
            data={generalSettings.noticeText}
            onReady={editor => {
                // console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
                const data = editor.getData();
                setSettingsInfo({...settingsInfo,noticeText:data})
                // console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
                // console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
                // console.log('Focus.', editor);
            }}
        />
    );
};

export default MyStatefulEditor;