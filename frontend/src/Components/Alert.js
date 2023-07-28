import React from 'react'


export default function Alert(props) {
  const capitalize=(word)=>{
      if(word==='danger'){
        word='error';
      }
    const lower= word.toLowerCase();
    return lower.charAt(0).toUpperCase()+lower.slice(1);
  }

    return(
      <div className="boxalert">
      {    props.resp&&   <div className={`alert alert-${props.resp.type} alert-dismissible fade show text-center`} role="alert">
          <strong>{capitalize(props.resp.type)}!</strong> {capitalize(props.resp.msge)}</div>}
      
       
        
      </div>
    )
}