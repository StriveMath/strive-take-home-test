import React, { FC, useState } from 'react';
import { atomone } from '@uiw/codemirror-theme-atomone';
import { python } from '@codemirror/lang-python';
import CodeMirror from '@uiw/react-codemirror';
import MyP5Component from '../p5';
import { ICodeEditorProps } from './code-editor.types';

const CodeEditor: FC<ICodeEditorProps> = ({ initialCode }) => {
	const [editorState, setEditorState] = useState<string>(initialCode);

	return (
		<div className="flex gap-4">
			<CodeMirror style={{ fontSize: '18px' }} onChange={(e) => setEditorState(e)} theme={atomone} extensions={[python()]} height="500px" width="500px" value={editorState} />
			<div>
				<MyP5Component p5Code={editorState} />
			</div>
		</div>
	);
};

export default CodeEditor;
