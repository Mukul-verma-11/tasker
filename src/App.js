import './App.css';
import { useState } from 'react';
import logo from './images/cover.png'

function App() {

  const [work, setWork] = useState([])
  const [id, setId] = useState(1)
  const [task, setTask] = useState('')
  const [Tup, setTup] = useState({ 'id': 0, 'task': '' })
  const [modDisplay, setDisplay] = useState('none')
  const [Utask, setUtask] = useState('')
  const [len, setLen] = useState('none')
  const [searchVal, setSearchVal] = useState('')
  const [tSort,setTsort] = useState('')
  

  const handleForm = e => {
    e.preventDefault()
  }

  const handleChange = e => {
    let a = e.currentTarget.value
    setTask(a)
    // console.log(task);
  }

  const onSubmit = () => {

    if (task.length > 0) {
    
    setId(id + 1)
    const Nwork = work
    const obj = {}
    obj['id'] = id
    obj['task'] = task
    obj['date'] = Date().toLocaleString().slice(0,25)
    Nwork.push(obj)
    console.log(obj);
    setWork(Nwork)
    setTask('')
      console.log(Date().toLocaleString());
      setLen('none')
    }
    else {
      setLen('block')
    }

    
  }

  const handleDelete = w => {
    const Narray = work.filter(ww => ww != w)
    setWork(Narray)
  }

  const handleUpdate = w => {
    console.log('a');
    setTup(w)
    // return modDisplay == 'none' ?  setDisplay('block')  : setDisplay('none')
    setDisplay('block')
  }



  const handleUpdateSubmit = e => {
    e.preventDefault()
  }

  const handleUpdateChange = e => {
    setUtask(e.currentTarget.value)
  }

  const handleUpdateBtn = Tid => {

    const N = work

    const obj = N.filter(n => n.id == Tid)
    console.log(obj);

    const index = work.indexOf(obj)
    obj[0]['task'] = Utask

    N[index] = obj
    console.log(N);
    setWork([...N])
    setUtask('')
    alert('successfully updated')
      
    }

    

  const handleClose = () => {
    setDisplay('none')
  }

  const onSort = accTo => {
    
    var arrWork = work
    if (accTo == 'task') {
      if (tSort == 'asc') {
        arrWork.sort((a, b) => {
          return a.task.toLowerCase() > b.task.toLowerCase() ? -1 : 1
        })
        setTsort('desc')
      }
      else {
        arrWork.sort((a, b) => {
          return a.task.toLowerCase() > b.task.toLowerCase() ? 1 : -1
        })
        setTsort('asc')
      }

    }

    if (accTo == 'id') {
      if (tSort == 'asc') {
        arrWork.sort((a, b) => {
          return a.id > b.id ? 1 : -1
        })
        setTsort('desc')
      }
      else {
        arrWork.sort((a, b) => {
          return a.id > b.id ? -1 : 1
        })
        setTsort('asc')
      }
    }
    setWork([...arrWork])

    console.log(...arrWork);
  }

  const handleSearch = e => {
    setSearchVal(e.currentTarget.value)
  }

  return (
    <div className="App" >


      <div className='logo' >
        <img src={logo}  />
      </div>

      <h3>To Sort The Table Click On Task / Id Column</h3>

      <div className='content' >
      <form onSubmit={handleForm} className='content_1' >
        <label style={{margin:'10px'}} >ENTER TASK</label> <br/>
        <input value={task} onChange={handleChange} type='search'  /> <br/>
        <button type='submit' className='btn1' onClick={onSubmit} >SUBMIT</button>
      </form>
      </div>

      <h2 className='content' style={{display:len}}>Task Cannot Be Empty</h2>

      

      {work.length > 0 ? 
      <form className='searchForm'>
      <label style={{margin:'7px'}}  >SEARCH TASK</label> <br/>
      <input type='search' value={searchVal} onChange={handleSearch} />
      </form> : <></> }

      

      <br/>
      <br />
      
      <div className='modal' style={{ display: modDisplay }} >
        
        <div className='box'  >
          <h2>Task ID : {Tup.id}</h2>
          <label>Update Task </label>

          <form onSubmit={handleUpdateSubmit} >

            <input type='search' value={Utask} onChange={handleUpdateChange} /> <br />
            <div className='updatebuttons' >
          <button className='updatebtn' onClick={() => handleUpdateBtn(Tup.id)} >UPDATE</button>
          <button className='btns' onClick={handleClose} >CLOSE</button>
            </div>

          </form>
          
        </div>
      </div>


      {work.length > 0 ?
        (<div className='container'>
          
          

      <table className='table'>
        
        <thead>
          <tr>
            <th>S.No.</th>
            <th onClick={()=> onSort('id')} >ID</th>
            <th onClick={()=> onSort('task')} >TASK</th>
            {/* <th>CHECK</th> */}
            <th>Date & Time</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {work.filter(w=>w.task.includes(searchVal)).map((w,i) => 
            <tr key={i}>
              <td>{i+1}</td>
              <td>{w.id}</td>
              <td>{ w.task }</td>
              {/* <td><input className='check' type='checkbox'/></td> */}
              <td>{ w.date }</td>
              <td><button className='btns' onClick={() => handleUpdate(w)}>Update</button></td>
              <td><button className='btns' onClick={() => handleDelete(w)}>Delete</button></td>
            </tr>
            )}
        </tbody>  
        
      </table>
</div>)
        : (<h2 className='content' style={{margin:'-10px'}}>ENTER TASKS</h2>)}
      
      <br />
      
      <div style={{height:'100px'}} ></div>
    </div>

    
  );
}

export default App;
