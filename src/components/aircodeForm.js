import React from 'react';
import Button from './button';
import './styles/aircodeForm.css';

function AircodeForm(props) {
  return (
    <div>
      <input
        className="aircode-bar"
        type="text"
        onChange={props.onChange}
        value={props.value}
        maxLength="24"
        placeholder="KMEM"
      />


      <h3>URLs</h3>

      <div className="checkbox-container"> {
        props.data.map(   (item, index) => (
          
          <label key={item.label}>
            <div>
            
            <table align="center" width="100%" cellpadding="0" cellspacing="0" border="0"> 
              <tr>
                <td> <input type="checkbox" checked={item.checked} /> </td>

                {/* <td> <input type="checkbox" checked='true' /> </td> */}
                <td> <input name="pre" id="id" type="text" placeholder={item.pre}/>  </td>
                <td>   {props.value}  </td> 
                <td>  <input name="post" id="id" type="text" placeholder={item.post} /></td>
              </tr> 
            </table>

            </div>
          </label>

        ))}
      </div>

      {props.optionsToggled ? (
        <>
          <div className="checkbox-container">
            <input type="checkbox" name="airnav" value="Airnav" />
            <label htmlFor="airnav">AirNav</label>
            <br />
            <input type="checkbox" name="aviation" value="Aviation" />
            <label htmlFor="aviation">AviationWeather</label>
            <br />
            <input type="checkbox" name="notams" value="NOTAM" />
            <label htmlFor="notam">NOTAM</label>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default AircodeForm;
