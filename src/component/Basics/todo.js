import React, { useEffect, useState } from "react";
import "./style.css";

// Get data from localStorage

function Todo() {
  const [item, setItems] = useState("");

  const [itemList, setItemList] = useState(getDataStorage());

  const [isEdit, setEdit] = useState("");

  const [button, setButton] = useState(false);

  function setOnchange(e) {
    setItems(e.target.value);
  }

  function addItem() {
    if (item === "") {
      alert("Please fill the data, Blanks not Allowed!!!");
    } else if (item && button) {
      setItemList(
        itemList.map((curItem) => {
          if (curItem.id === isEdit) {
            return { ...curItem, name: item };
          }
          return curItem;
        })
      );
      setItems("");
      setEdit(null);
      setButton(false);
    } else {
      const NewData = {
        id: new Date().getTime().toString(),
        name: item,
      };
      setItemList([...itemList, NewData]);
    }
    setItems("");
  }

  function handleDelete(id) {
    // setItemList((currentList) => {
    //   return currentList.filter((listItem) => {
    //     return listItem.id !== id;
    //   });
    // });

    const updatedList = itemList.filter((item) => {
      return item.id !== id;
    });
    setItemList(updatedList);
  }

  function deleteCheckList() {
    setItemList([]);
  }

  function editItem(id) {
    const itemEdit = itemList.find((item) => {
      return item.id === id;
    });
    setItems(itemEdit.name);
    setEdit(id);
    setButton(true);
  }

  // Add data to localStorage
  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(itemList)); // Stringify to convert data to string
  }, [itemList]);

  function getDataStorage() {
    const dataList = localStorage.getItem("todolist");

    if (dataList) {
      return JSON.parse(dataList); // parse to convert string data as an array
    } else {
      return [];
    }
  }

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todo" />
            <figcaption>Add Your List Here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              value={item}
              onChange={setOnchange}
              placeholder="✍️ Add Item"
              className="form-control"
            />
            {button ? (
              <i className="far fa-edit fa-2x" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>
          {/* Show Items */}
          <div className="showItems">
            {itemList.map((item) => {
              return (
                <div className="eachItem" key={item.id}>
                  <h3>{item.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit fa-2x"
                      onClick={() => editItem(item.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt fa-2x"
                      onClick={() => handleDelete(item.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Remove all */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={deleteCheckList}
            >
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
