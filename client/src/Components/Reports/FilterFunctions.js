export function BasicInfo(report){
    let tableData={};
    tableData.SchemaVersion=report?.SchemaVersion;
    tableData.CreatedAt=report?.CreatedAt;
    tableData.ArtifactName=report?.ArtifactName;
    tableData.ArtifactType=report?.ArtifactType;
    return [tableData]
}
export function OSInfo(report){
    let tableData={}
    tableData.OSFamily=report?.Metadata?.OS?.Family;
    tableData.OSVersion=report?.Metadata?.OS?.Name;
    tableData.ImageID=report?.Metadata?.ImageID;
    tableData.Architecture=report?.Metadata?.ImageConfig?.architecture;
    tableData.Created=report?.Metadata?.ImageConfig?.created;
    tableData.OSName=report?.Metadata?.ImageConfig?.os;
    return [tableData]
}
export function CreationHistory(report){
    return report?.Metadata?.ImageConfig?.history;
}
export function Packages(report){
    let tableData=[]
    report?.Results?.forEach(result => {
        let tableRow={}
        tableRow.Package=result?.Target
        tableRow.Class=result?.Class
        tableRow.Type=result?.Type
        console.log(tableRow);
        tableData.push(tableRow)
    });
    return tableData;
}

export function Vulnerabilities(report,target){
    let temp1;
    report?.Results?.forEach(result=>{
        if(result.Target==target){
            temp1=result
        }
    })
    if(!temp1)return []
    let tableData=[]
    temp1.Vulnerabilities.forEach(vuln=>{
        let tableRow={}
        tableRow.VulnerabilityID=vuln?.VulnerabilityID;
        tableRow.PkgID=vuln?.PkgID;
        tableRow.PkgName=vuln?.PkgName;
        tableRow.PkgPath=vuln?.PkgPath;
        tableRow.InstalledVersion=vuln?.InstalledVersion;
        tableRow.Status=vuln?.Status;
        tableRow.SeveritySource=vuln?.SeveritySource;
        tableRow.PrimaryURL=vuln?.PrimaryURL;
        tableRow.Title=vuln?.Title;
        tableRow.Description=vuln?.Description;
        tableRow.Severity=vuln?.Severity;
        tableRow.PublishedDate=vuln?.PublishedDate;
        tableRow.LastModifiedDate=vuln?.LastModifiedDate;
        tableData.push(tableRow)
    })
    return tableData;
}