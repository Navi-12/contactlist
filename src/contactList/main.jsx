import React from 'react';
function Data(props) { 
        return (
            <div className="contact">
            <h1>Contacts</h1>
            <div>
                <input type="text" className="search-bar" placeholder="Search here......"  onChange={(e)=>props.search(e)} />
                <button className="add-contact" onClick={(e)=>props.addingContacts(e)} >CreateNewContact</button>
            </div>
            </div> 
         );
    }
export default Data;