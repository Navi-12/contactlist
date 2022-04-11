import React from "react";
function AddContacts(props) {
  let contactsArray = props.value.map((element, index) => {
    return (
      <tr key={element.id}>
        <td>{element.id}</td>
        <td className="image">
          <img src={element.avatar_url} />
        </td>
        <td className="first-name">{element.first_name}</td>
        <td className="last-name">{element.last_name}</td>
        <td className="email">{element.email}</td>
        <td className="phone">{element.phone}</td>
        <td>
          <button
            className="edit"
            onClick={event => props.updateItem(event, index)}
          >
            Edit
          </button>
          <button
            className="delete"
            onClick={event => props.deleteItem(event, index)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });
  return <React.Fragment>{contactsArray}</React.Fragment>;
}
export default AddContacts;
