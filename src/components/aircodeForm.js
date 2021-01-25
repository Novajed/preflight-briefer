import React from 'react';
import Button from './button';
import './styles/aircodeForm.css';

function AircodeForm(props) {


  return (
    <div>

      {/* Airport Code Entry Field  */}
      <input
        className="aircode-bar"
        type="text"
        
        onChange={props.onChange}
        value={props.value}
        maxLength="24"
        placeholder="KMEM"
      />



      {/* URL entry checkboxes and entry fields */}
      

      <h3>URLs</h3>
      
      <div className="checkbox-container"> {

        props.data.map((item, index) => (   // for each url in the data array...
          <div key={index}>

          <table align="center" width="100%" > <tbody>
            <tr>
              
              <td> <input type="checkbox" checked={item.checked}  onChange={handleCheckBoxClick} /> </td>

              <td>  <input name="pre" id="id" type="text" placeholder={item.pre} />  </td>

              <td>      {props.value}  </td>

              <td>  <input name="post" id="id" type="text" placeholder={item.post} /></td>


              </tr>
            </tbody></table>

          </div>
        ))}

      </div>


    </div>


  );

  function handleCheckBoxClick() {

      const doug = '12';

    props.checkBoxChecked(doug);

  }


}




export default AircodeForm;
