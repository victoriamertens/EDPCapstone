import { useEffect, useState } from "react"
import AnalysisHeaderBox from "./AnalysisHeaderBox";
import "./Analysis.css"

export default function Analysis () {
    
const [analysisData, setAnalysisData] = useState({})
    
    useEffect( () => {
      loadAnalysisData()
    }, []);
    

  const loadAnalysisData = async () => { 
    console.log("Loading data for analysis");
    const response = await fetch(`http://localhost:3000/analysis`)
    const data = await response.json();
    setAnalysisData(data)
    console.log(data);

  }
  let entries = Object.entries(analysisData);
   

    return ( 
        <div>
        <h2>Company Analysis</h2>
        <div className="analysis-header">
        {analysisData.role_count ? entries.map((data)=><AnalysisHeaderBox key={data[0]} data={data}/>) : <p>Loading...</p>}
        </div>
        </div>
    )
}