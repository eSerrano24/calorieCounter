// Storage Controller

//Item Controller
const ItemCtrl = (function () {
  //Item Constructor
  const item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  //Data Structure/state
  const data = {
    items: [
      //   { id: 0, name: "Steak Dinner", calories: 1200 },
      //   { id: 1, name: "Cookie", calories: 400 },
      //   { id: 2, name: "Eggs", calories: 300 },
    ],
    currentItem: null,
    totalCalories: 0,
  };
  //public methods
  return {
    getItems: function () {
      return data.items;
    },
    addItem: function (name, calories) {
      let ID;
      //Create ID
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      //Calories to number
      calories = parseInt(calories);

      //create new item
      newItem = new item(ID, name, calories);

      //Add to Items array
      data.items.push(newItem);

      return newItem;
    },
    logData: function () {
      return data;
    },
  };
})();

//UI Controller
const UICtrl = (function () {
  const UISelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
  };
  //public methods
  return {
    populateItemList: function (items) {
      let html = "";
      items.forEach(function (item) {
        html += `<li class="collection-item" id="item-${item.id}">
              <strong>${item.name}:</strong><em>${item.calories} Calories</em>
              <a href="" class="secondary-content">
                <i class=" edit-item fa fa-pencil"></i>
              </a>
            </li>`;
      });

      //Insert list Items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },
    addListItem: function (item) {
      //Show List Item
      document.querySelector(UISelectors.itemList).style.display = "block";
      //Create li Element
      const li = document.createElement("li");
      //add class
      li.className = "collection-item";
      //add ID
      li.id = `item-${item.id}`;

      //Add HTML
      li.innerHTML = `<strong>${item.name}:</strong><em>${item.calories} Calories</em>
        <a href="" class="secondary-content">
          <i class=" edit-item fa fa-pencil"></i>
        </a>`;

      //Insert Item
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },

    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },
    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },
    getSelectors: function () {
      return UISelectors;
    },
  };
})();

//App Controller
const App = (function (ItemCtrl, UICtrl) {
  // Load Event listeners
  const loadEventListeners = function () {
    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors();

    //Add Item Event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);
  };

  //Add item submit
  const itemAddSubmit = function (e) {
    //Get form input from UI controller
    const input = UICtrl.getItemInput();

    //Check for name and calorie input
    if (input.name !== "" && input.calories !== "") {
      //add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      // Add item to UI list
      UICtrl.addListItem(newItem);
    }

    //Clear Fields
    UICtrl.clearInput();

    //
    e.preventDefault();
  };

  //Public Methoes
  return {
    init: function () {
      //Fetch items from data structure
      const items = ItemCtrl.getItems();

      //Check if any items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        //Populate List
        UICtrl.populateItemList(items);
      }

      //Populate list with items
      UICtrl.populateItemList(items);

      //load event listenrs
      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl);

//Initializing app
App.init();
