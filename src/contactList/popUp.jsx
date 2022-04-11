import React from "react";
function PopUp(props) {
  console.log(props.myState.showPopup);
  if (props.myState.showPopup == true) {
    return (
      <div className="pop-up">
        <div className="form-modal">
          <div>
            <span>first_name: </span>
            <input
              type="text"
              placeholder="enter....."
              className="first-name"
              name="first_name"
              value={props.first_name}
            />
          </div>
          <div>
            <span>last_name: </span>
            <input
              type="text"
              placeholder="enter....."
              className="last-name"
              name="last_name"
              value={props.last_name}
            />
          </div>
          <div>
            <span>email: </span>
            <input
              type="text"
              placeholder="enter....."
              className="email"
              name="email"
              value={props.email}
            />
          </div>
          <div>
            <span>phone: </span>
            <input
              type="text"
              placeholder="enter....."
              className="phone-number"
              name="phone"
              value={props.phone}
            />
          </div>
          <button type="submit" onClick={e => props.handleSubmit(e)}>
            AddContact
          </button>
          <button onClick={e => props.closePopUp(e)}>close me</button>
        </div>
      </div>
    );
  } else return null;
}
export default PopUp;
