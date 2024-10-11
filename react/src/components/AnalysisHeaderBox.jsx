export default function AnalysisHeaderBox ({data}){ 

    const headerName = { 
        
    "employee_count": "Total Number of Employees",
    "role_count": "Number of Roles/Titles",
    "avg_salary": "Average Salary",
    "total_cost": "Cost of all Employees",
    "commonLocation": "Most Common Work Location"
    }

    if(data[0] === "avg_salary" || data[0] === "total_cost"){ 
        let number = Math.floor(data[1])
        const formattedNumber = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(number);
     
          return (
        <div className="box">
            <p><strong>{headerName[data[0]]}</strong></p>
            <p>{formattedNumber}</p>
        </div>
    )
    }

    if(typeof(data[1])=== "object") { 
        return ( 
            <div className="box">
            <p><strong>{headerName[data[0]]}</strong></p>
            <p>{data[1]._id}</p>
        </div>
        )
    } else {
    return (
        <div className="box">
            <p><strong>{headerName[data[0]]}</strong></p>
            <p>{data[1]}</p>
        </div>
    )}
}