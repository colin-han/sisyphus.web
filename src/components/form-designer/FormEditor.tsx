import {Editor, useMonaco} from "@monaco-editor/react";
import {editor} from "monaco-editor";
import {useEffect, useRef} from "react";
import {ParseError} from "@/types/ParseError";

export interface FlowEditorProps {
    onChange: (code?: string) => void;
    code: string;
    errors?: ParseError[];
}

export default function FlowEditor(props: FlowEditorProps) {
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
    const monaco = useMonaco();

    function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
        // here is the editor instance
        // you can store it in `useRef` for further usage
        editorRef.current = editor;
    }

    useEffect(() => {
        if (editorRef.current && monaco) {
            monaco.editor.setModelMarkers(editorRef.current.getModel()!, "owner", props.errors?.map(e => ({
                startLineNumber: e.line,
                startColumn: e.column + 1,
                endLineNumber: e.line,
                endColumn: e.column + e.length + 1,
                message: e.message,
                severity: 8,
            })) ?? []);
        }
    }, [props.errors, monaco]);

    return (
        <Editor
            height="90vh"
            defaultLanguage="plaintext"
            defaultValue={props.code}
            options={{
                theme: 'vs-dark',
                scrollBeyondLastLine: false,
                minimap: {enabled: false},
            }}
            onMount={handleEditorDidMount}
            onChange={props.onChange}
        />
    );
}