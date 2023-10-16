import { Editor } from "@monaco-editor/react";
import { useRef } from "react";

export interface FlowEditorProps {
    onChange: (code?: string) => void;
    code: string;
}
export default function FlowEditor(props: FlowEditorProps) {
    // const editorRef = useRef<typeof Editor>(null);

    // function handleEditorDidMount(editor: typeof Editor) {
    //     // here is the editor instance
    //     // you can store it in `useRef` for further usage
    //     editorRef.current = editor;
    // }

    return (
        <Editor
            height="90vh"
            defaultLanguage="plaintext"
            defaultValue={props.code}
            options={{
                theme: 'vs-dark',
                scrollBeyondLastLine: false,
                minimap: { enabled: false },
            }}
            // onMount={handleEditorDidMount}
            onChange={props.onChange}
        />
    );
}