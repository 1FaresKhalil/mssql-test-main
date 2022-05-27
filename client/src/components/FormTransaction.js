import React, { useEffect, useState } from 'react';

const FormTransaction = ()=>{
    const [account_id,SetAccid] = useState(1);
    const [branch_id,SetBrid] = useState('');
    const [amount,SetAmt] = useState('');
    const GetAccountID = ()=>{
        const parameters = window.location.search.substring(1).split("&");
        const temp = parameters[0].split("=");
        console.log(parameters);
        console.log(temp);
        SetAccid(temp[1]);
    };
    useEffect(()=>{
        GetAccountID();
    },[]);
    const DoTransaction = ()=>{

        fetch('http://localhost:5000/api/transaction',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                account_id:account_id,
                branch_id:branch_id,
                amount:amount,
                transaction_type:'deposit'
            })
        }).then(res=>res.json()).then(data=>{
            SetAmt('');
            SetBrid('');
            
            console.log(data);
        }
        );
    };
    return(
        <div>
    <h1>Transaction</h1>
        <hr></hr>
    <div className="form-group">
    <label>Account ID</label>
    <input type="text" className="form-control" id="exampleInputEmail1" value={account_id} disabled required />
    <label >Branch ID</label>
    <input type="number" className="form-control" id="brid" onChange={e=>SetBrid(+e.target.value)} required/>
    <label >Amount</label>
    <input type="number" className="form-control" id="amount" onChange={e=>{
        
        SetAmt(+e.target.value)
        
        }} required/>
    <label >Action</label>
    <select id="inputState" class="form-control">
        <option selected>Deposit</option>
      </select>
    </div>

    <button type="submit" onClick={DoTransaction} className="btn btn-primary">Add</button>
</div>
  );  
};

export default FormTransaction;