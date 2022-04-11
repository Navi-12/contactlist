import React from "react";
function List(props) {
  return (
    <React.Fragment>
      <tr>
        <th className="id">id</th>
        <th className="img">img</th>
        <th className="first">first_name</th>
        <th className="last">last_name</th>
        <th className="email">email</th>
        <th className="phone">phone_number</th>
        <th className="update">Update</th>
      </tr>
    </React.Fragment>
  );
}
export default List;
