import React, { Component } from "react";
import Data from "./main";
import List from "./list";
import AddContacts from "./add";
import PopUp from "./popUp";
let contactArray = require("./contact.json");
let contacts = [...contactArray];
const searchContact = [...contactArray];
class Contact extends Component {
  constructor(props) {
    super(props);
    let initialContacts;
    if(localStorage.getItem("items")){
      initialContacts = JSON.parse(localStorage.getItem("items"));
    }
    else {
      initialContacts = contacts
      localStorage.setItem("items", JSON.stringify(contacts));
    }
    this.state = {
      data: initialContacts,
      showPopup: false,
      updatedId:0,
      updatedImage:""
    };
  }
  handleUpdation = (e, index) => {
    e.preventDefault();
    let targetContact = e.target.parentNode.parentNode;
    let targetId=targetContact.firstChild.innerHTML;
    let targetImage=e.target.parentNode.parentNode.querySelector(".image img ").src;
    console.log(targetImage);
    console.log(targetId);
    console.log(index + 1);
    let updationArray = [];
    let updatedArray = {};
    updationArray[0] = e.target.parentNode.parentNode.querySelector(
      ".first-name"
    ).innerHTML;
    updationArray[1] = e.target.parentNode.parentNode.querySelector(
      ".last-name"
    ).innerHTML;
    updationArray[2] = e.target.parentNode.parentNode.querySelector(
      ".email"
    ).innerHTML;
    updationArray[3] = e.target.parentNode.parentNode.querySelector(
      ".phone"
    ).innerHTML;
    const poptarget = e.target;
    this.setState(
      {
        showPopup: true,
      },
      () => {
        if (this.state.showPopup == true) {
          let pop =
            poptarget.parentNode.parentNode.parentNode.parentNode.parentNode
              .parentNode.firstChild;
          updatedArray["first_name"] = pop.querySelector(".first-name").value =
            updationArray[0];
          updatedArray["last_name"] = pop.querySelector(".last-name").value =
            updationArray[1];
          updatedArray["email"] = pop.querySelector(".email").value =
            updationArray[2];
          updatedArray["phone"] = pop.querySelector(".phone-number").value =
            updationArray[3];
        }
      }
    );
    console.log(updatedArray);
    this.setState({
      updatedId:targetId,
      updatedImage:targetImage
    })
  };
  handleSearch = e => {
    e.preventDefault();
    let searchElement = [...searchContact];
    if (e.target.value != "") {
      let elementSearched = searchElement.filter(element => {
        return (
          element.first_name
            .toLowerCase()
            .search(e.target.value.toLowerCase()) !== -1|| element.last_name
            .toLowerCase()
            .search(e.target.value.toLowerCase()) !== -1|| element.email
            .toLowerCase()
            .search(e.target.value.toLowerCase()) !== -1|| element.phone
            .toLowerCase()
            .search(e.target.value.toLowerCase()) !== -1
        );
      });
      this.setState(
        {
          data: elementSearched
        },
        () => {
          localStorage.setItem("items", JSON.stringify(this.state.data));
        }
      );
    } else {
      this.setState(
        {
          data: searchElement
        },
        () => {
          localStorage.setItem("items", JSON.stringify(this.state.data));
        }
      );
    }
  };

  handledeletion = (e, index) => {
    e.preventDefault();
    const list = this.state.data
      .slice(0, index)
      .concat(this.state.data.slice(index + 1));
    this.setState(
      {
        data: list
      },
      () => {
        localStorage.setItem("items", JSON.stringify(this.state.data));
      }
    );
  };
  handleAdding = e => {
    e.preventDefault();
    let contact = {};
    let first = e.target.parentNode.querySelector(".first-name");
    let last = e.target.parentNode.querySelector(".last-name");
    let email = e.target.parentNode.querySelector(".email");
    let phone = e.target.parentNode.querySelector(".phone-number");
    if(this.state.updatedId==0){
    let url = `https://robohash.org/${first.value}`;
    contact = {
      id: this.state.data.length + 1,
      avatar_url: url,
      first_name: first.value,
      last_name: last.value,
      email: email.value,
      phone: phone.value
    };
    const list = this.state.data.slice().concat([contact]);
    this.setState(
      {
        data: list,
        showPopup: false
      },
      () => {
        localStorage.setItem("items", JSON.stringify(this.state.data));
      }
    );
    }
    else{
      contact = {
        id: this.state.updatedId,
        avatar_url:this.state.updatedImage,
        first_name: first.value,
        last_name: last.value,
        email: email.value,
        phone: phone.value
      };
     
      const list = this.state.data.slice(0,this.state.updatedId-1).concat([contact],this.state.data.slice(this.state.updatedId))
      console.log(list)
    this.setState(
      {
        data: list,
        showPopup: false,
        updatedId:0,
        updatedImage:""
      },
      () => {
        localStorage.setItem("items", JSON.stringify(this.state.data));
      }
    
    );
  };
}

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  render() {
    return (
      <div className="main-content">
        <PopUp
          myState={this.state}
          handleSubmit={this.handleAdding}
          closePopUp={this.togglePopup.bind(this)}
        />
        <Data
          search={this.handleSearch}
          addingContacts={this.togglePopup.bind(this)}
        />
        <div className="contact-list">
          <table>
            <tbody>
              <List />
              <AddContacts
                value={this.state.data}
                updateItem={this.handleUpdation}
                deleteItem={this.handledeletion}
              />
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Contact;
