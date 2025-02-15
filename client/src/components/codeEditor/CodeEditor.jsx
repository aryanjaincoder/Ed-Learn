import React, { useState, useContext } from "react";
import { EditorView } from "@codemirror/view";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { basicSetup } from "codemirror";
import CodeMirror from "@uiw/react-codemirror";
import axios from "axios";

import "./CodeEditor.css";
import { ThemeContext } from "../../context/ThemeContext";

export default function CodeEditor({ problem, updateScore }) {
  const languageVersions = {
    cpp: ["10.2.0"],
    python: ["3.10.0"],
    java: [" 11.0.11"],
  };

  const { darkMode } = useContext(ThemeContext);
  const [code, setCode] = useState(
    `#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello, Code Quest!";\n  return 0;\n}`
  );
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("cpp");
  const [version, setVersion] = useState(languageVersions["cpp"][0]);

  const languageExtensions = {
    cpp: cpp(),
    python: python(),
    java: java(),
  };

  const boilerplateCode = {
    cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello, Code Quest!";\n  return 0;\n}`,
    python: `print("Hello, Code Quest!")`,
    java: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, Code Quest!");\n  }\n}`,
  };

  const handleLanguageChange = (event) => {
    const selectedLang = event.target.value;
    setLanguage(selectedLang);
    setCode(boilerplateCode[selectedLang]);
    setVersion(languageVersions[selectedLang][0]); // Set default version
  };

  const runCode = async () => {
    setLoading(true);
    setOutput("Running...");

    try {
      const response = await axios.post(
        "https://emkc.org/api/v2/piston/execute",
        {
          language,
          version,
          files: [{ content: code }],
          stdin: problem.testCases[0].input,
        }
      );

      const result = response.data.run.output.trim();

      const expectedOutput = problem.testCases[0].expectedOutput.trim();

      if (result === expectedOutput) {
        updateScore(true);
        setOutput(`✅ Correct Output: ${result}`);
      } else {
        updateScore(false);
        setOutput(`❌ Wrong Output: ${result}`);
      }
    } catch (error) {
      setOutput("Error running code!");
    }

    setLoading(false);
  };

  return (
    <div className={`code-editor-container ${darkMode ? "dark" : ""}`}>
      <h2>Online Code Editor</h2>

      {/* Code Editor Window */}
      <div className="editor-window">
        {/* Language Selector inside the Editor Window */}
        <div className="editor-header">
          <label>Language: </label>
          <select
            className="language-select"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
        </div>

        <CodeMirror
          value={code}
          height="350px"
          theme={darkMode ? "dark" : "light"}
          extensions={[
            languageExtensions[language],
            EditorView.lineWrapping,
            basicSetup,
          ]}
          onChange={setCode}
        />
      </div>

      <textarea
        className="input-box"
        placeholder="Enter input here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>

      <button className="run-btn" onClick={runCode} disabled={loading}>
        {loading ? "Running..." : "Run Code"}
      </button>

      <div className="output-box">
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
}
