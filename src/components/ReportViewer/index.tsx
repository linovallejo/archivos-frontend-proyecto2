/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { instance } from '@viz-js/viz'; // Import the Viz class from the @viz-js/viz package

interface ReportViewerProps {
    dotCode: string;
  }
const ReportViewer: React.FC<ReportViewerProps> = ({ dotCode }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [dotCodeReport, setDotCodeReport] = useState('');

    // useEffect(() => {
    //     fetch('http://localhost:4000/api/generate-dot')
    //         .then(res => res.json())
    //         .then(data => {
    //             setDotCode(data.dot);
    //             renderDot(data.dot);
    //         })
    //         .catch(err => console.error('Failed to fetch DOT code:', err));
    // }, []);
    useEffect(() => {
        setDotCodeReport(`digraph G {
            a -> b
            a -> c
            b -> d
            c -> d
        }`);
        renderDot(`digraph G {
            a -> b
            a -> c
            b -> d
            c -> d
        }`); 
    }, [])

    useEffect(() => {
        renderDot(dotCode
        )
    })

    const renderDot = async (dot: string) => {
        try {
          const viz = await instance(); // Wait for the Viz instance
          const svgElement = viz.renderSVGElement(dot); 
    
          const Element = document.getElementById('dotOutput') as HTMLElement;
          Element.innerHTML = '';
          Element.appendChild(svgElement); 
        } catch (error) { 
          // ... (Your error handling code here)
        }
      }

    return (
        <div>
            <h1>Graph Visualization</h1>
            <div id="dotOutput"></div>
        </div>
    );
};

export default ReportViewer;
