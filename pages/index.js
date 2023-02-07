import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import buildspaceLogo from "../assets/buildspace-logo.png";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiOutput, setApiOutput] = useState("");

  const callGenerateAPI = async () => {
    setIsGenerating(true);
    console.log("Prompt: ", prompt)
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    console.log(data);
    const { output } = data;
    console.log("OpenAI Output: ", output);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
    setPrompt("");
  };

  const onPromptChange = (event) => {
    console.log(event.target.value);
    setPrompt(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Simplify5🐣</h1>
          </div>
          <div className="header-subtitle">
            <h2>Get explanations for any topic as if you were a 5 year old</h2>
          </div>
        </div>
        <div className="prompt-container">
          <input
            type="text"
            placeholder="Enter a topic to explain eg. 'How does a computer work?'"
            className="prompt-box"
            value={prompt}
            onChange={onPromptChange}
          />
          <div className="prompt-buttons">
            <a className="generate-button" onClick={callGenerateAPI}>
              <div className="generate">
              {isGenerating ? <span className="loader"></span> : <p>Explain</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Output</h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
    </div>
  </div>
)}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
