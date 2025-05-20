import './index.css'
import './App.css'
import { useRef, useCallback } from 'react';
import { useReactToPrint } from 'react-to-print';

function App() {
  const componentRef = useRef(null);

  const handleAfterPrint = useCallback(() => {
    console.log("Certificate Printed.");
  }, []);

  const handleBeforePrint = useCallback(() => {
    console.log("Printing Certificate...");
    return Promise.resolve();
  }, []);

  const printFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `remote`,
    onAfterPrint: handleAfterPrint,
    onBeforePrint: handleBeforePrint,
  });
  return (
    <div>
      <h1>Remote App Compnent</h1>
      <p className="read-the-docs">
        This is content from the remote app
      </p>
      <button onClick={printFn}>click me</button>
    </div>
  )
}

export default App
