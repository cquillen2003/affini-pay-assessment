import React from 'react';
import Paragraph from './Paragraph';
import './App.css';

const p1 = `
  Design simple views for each state in your
  application, and React will efficiently update 
  and render just the right components when 
  your data changes. Declarative views make your
  code more predictable and easier to debug.
`;

const p2 = `
  Build encapsulated components that manage 
  their own state, then compose them to make 
  complex UIs. Since component logic is written 
  in JavaScript instead of templates, you can 
  easily pass rich data through your app and 
  keep state out of the DOM.
`;

const p3 = `
  We don’t make assumptions about the rest of
  your technology stack, so you can develop new
  features in React without rewriting existing code.
`;

function App() {
  return (
    <div className="App">
      <h1>Reader.com</h1>
      <Paragraph text={p1}/>
      <Paragraph text={p2}/>
      <Paragraph text={p3}/>
    </div>
  );
}

export default App;
