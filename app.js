// ================== CALORIE CONTROLLER ==================== 
const calorieController = (function() {

   // constructor Meal
   const Meal = function(id, mealName, calorie, proteins, carbs, fat) {
        this.id = id;
        this.mealName = mealName;
        this.calorie = calorie;
        this.proteins = proteins;
        this.carbs = carbs;
        this.fat = fat;
   }

   // store all data
   let data = {
       allItems: {
           item: []
       },
       totals: {
            calorie: 0,
            proteins: 0,
            carbs: 0,
            fat: 0
       }
      
   };

   // calculate calories
   const calculateCalorie = function() {
            let sumCalorie = 0;

            data.allItems.item.forEach(function(current){
                sumCalorie = sumCalorie + current.calorie;
            });

            data.totals.calorie = sumCalorie;
   };

   // calculate proteins
   const calculateProteins = function() {
        let sumProteins = 0;

        data.allItems.item.forEach(function(current){
            sumProteins = sumProteins + current.proteins;
        });

        data.totals.proteins = sumProteins;
   };

   // calculate carbs
   const calculateCarbs = function() {
        let sumCarbs = 0;

        data.allItems.item.forEach(function(current){
            sumCarbs = sumCarbs + current.carbs;
        });

        data.totals.carbs = sumCarbs;
    };

    // calculate fat
    const calculateFat = function() {
        let sumFat = 0;

        data.allItems.item.forEach(function(current){
            sumFat = sumFat + current.fat;
        });

        data.totals.fat = sumFat;
    };
 

   return {
       // add meal to data
       addMealToData: function(mealName, calorie, proteins, carbs, fat) {
            let newItem, ID;

            // Create a new ID
            if(data.allItems.item.length > 0) {
                ID = data.allItems.item[data.allItems.item.length-1].id +1;
            }else {
                ID = 0;
            }

            newItem = new Meal(ID, mealName, calorie, proteins, carbs, fat);

            data.allItems.item.push(newItem);

            return newItem;

       },

       // Calculate all things: calorie, proteins, carbs and fat
       calculateAll: function() {
            // calculate calories
            calculateCalorie();
            // calculate proteins
            calculateProteins();
            // calculate carbs
            calculateCarbs();
            // calculate fat
            calculateFat();
       },

       // get items from data
       getItems: function() {
            return data.allItems.item;
       },

       // get all totals
       getData: function() {
           return {
               totalCalorie: data.totals.calorie,
               totalProteins: data.totals.proteins,
               totalCarbs: data.totals.carbs,
               totalFat: data.totals.fat
           }
       },
       // remove all items from data
       removeAllItems: function() {
            data = {
                allItems: {
                    item: []
                },
                totals: {
                    calorie: 0,
                    proteins: 0,
                    carbs: 0,
                    fat: 0
                }
            
            }
       },

       // remove item from data by ID
       removeItem: function(id) {
            let ids, index;
            
            // get IDs and put them into new array
            ids = data.allItems.item.map(function(current){
                return current.id;
            });

            index = ids.indexOf(id);

            if(index !== -1) {
                data.allItems.item.splice(index, 1);
            }
       },

       //get item by ID
       getItemById: function(id) {
        let ids, index, item;
            
            // get IDs and put them into new array
            ids = data.allItems.item.map(function(current){
                return current.id;
            });

            index = ids.indexOf(id);

            if(index !== -1) {
               item = data.allItems.item[index];
            }

            return item;
            
            
       },

       // update item by ID
       updateItem: function(id, item) {
        let ids, index, updatedItem;
            
        // get IDs and put them into new array
        ids = data.allItems.item.map(function(current){
            return current.id;
        });

        index = ids.indexOf(id);

       
        updatedItem = data.allItems.item[index];
        updatedItem.mealName = item.mealName;
        updatedItem.calorie = parseInt(item.calorie);
        updatedItem.proteins = parseInt(item.proteins);
        updatedItem.carbs = parseInt(item.carbs);
        updatedItem.fat = parseInt(item.fat);
        
       },

       testing: function() {
            console.log(data);
        }
   }

})();

// ================== UI CONTROLLER ==================== 
const UIController = (function() {

    const DOMstrings = {
        form: '.form-section__form',
        btnAdd: '.btnAdd',
        btnAdd__span: '.btnAdd__span',
        btnCancel: '.btnCancel',
        btnEdit: '.btnEdit',
        mealName: '.meal',
        calorie: '.calorie',
        proteins: '.proteins',
        carbs: '.carbs',
        fat: '.fat',
        message: '.message',
        totalCalorie: '.results__totalCalorie',
        totalProteins: '.results__totalProteins',
        totalCarbs: '.results__totalCarbs',
        totalFat: '.results__totalFat',
        table: '.items__table',
        tableTbody: '.items__table--tbody',
        clearAllBtn: '.clearAll',
        linkEdit: '.linkEdit',
        hiddenInputID: '.hiddenInputID'
    }

    //show message
    const showMessage = function(msg, className) {
        const message =  `<p class="alert ${className}">${msg}</p>`;

        // remove message after 3 sec
        setTimeout(() => {
            document.querySelector(DOMstrings.message).innerHTML = '';
        }, 3000);

        return message;
        
    };



    return {
        // get names of element in UI
        getInput: function(){
            return DOMstrings;
        },
        // show message
        message: function(msg, className){
            return showMessage(msg, className);
        },

        // get input data
        getInputData: function() {
            let data = [];

            const meal = document.querySelector(DOMstrings.mealName).value,
                  calorie =  document.querySelector(DOMstrings.calorie).value,
                  proteins = document.querySelector(DOMstrings.proteins).value,
                  carbs = document.querySelector(DOMstrings.carbs).value,
                  fat =  document.querySelector(DOMstrings.fat).value;

            if(meal === '' || calorie ==='' || proteins === '' || carbs === '' || fat === ''){
                // show message
            }else {
                if(calorie < 0 || proteins < 0 || carbs < 0 || fat < 0) {
                   data = false;
                }else {
                    data = {
                        'mealName': meal,
                        'calorie': calorie,
                        'proteins': proteins,
                        'carbs': carbs,
                        'fat': fat
                    }
                }

            }
                return data;

        },

        // Display total calories, proteins, carbs and fat in UI
        displayCountedData: function(data) {
            document.querySelector(DOMstrings.totalCalorie).textContent = data.totalCalorie + ' kcal';;
            document.querySelector(DOMstrings.totalProteins).textContent = data.totalProteins + ' g';;
            document.querySelector(DOMstrings.totalCarbs).textContent = data.totalCarbs + ' g';;
            document.querySelector(DOMstrings.totalFat).textContent = data.totalFat + ' g';;
        },

        // display item in UI
        displayItemInUI: function(items){
            let html = '';
            items.forEach(function(item) {
                
                html += ` <tr id="${item.id}">
                <td><span class="items__table--name">${item.mealName}</span></td>
                <td><span class="items__table--calorie">${item.calorie} </span>kcal</td>
                <td><span class="items__table--proteins">${item.proteins}</span>g</td>
                <td><span class="items__table--carbs">${item.carbs}</span>g</td>
                <td><span class="items__table--fat">${item.fat}</span>g</td>
                <td><button class="btn btnDelete">Delete</button><a class=" linkEdit">Edit</a></td>
              </tr>`;
                
                
            });

            document.querySelector(DOMstrings.tableTbody).innerHTML = html;

        },

        // remove all items from table
        removeAllItemsFromTable: function() {
            document.querySelector(DOMstrings.tableTbody).innerHTML = '';
        },

        // remove item from UI by ID
        removeItemFromUI(id) {
            let el;
            el = document.getElementById(id).remove();
           
        },

        // display item in form
        displayItemInForm: function(item) {
            document.querySelector(DOMstrings.hiddenInputID).value  = item.id;
            document.querySelector(DOMstrings.mealName).value  = item.mealName;
            document.querySelector(DOMstrings.calorie).value  = item.calorie;
            document.querySelector(DOMstrings.proteins).value  = item.proteins;
            document.querySelector(DOMstrings.carbs).value  = item.carbs;
            document.querySelector(DOMstrings.fat).value  = item.fat;

            // Delete button for ADD;
            document.querySelector(DOMstrings.btnAdd).style.display = 'none';
           

            // Show button CANCEL
            document.querySelector(DOMstrings.btnCancel).style.display = 'inline-block';
            // show button edit
            document.querySelector(DOMstrings.btnEdit).style.display = 'inline-block';
        },

        //Clear inputs
        clearInput: function(){
           let inputs = document.querySelectorAll("input");

           inputs.forEach(function(input){
                input.value = '';
           });

        },

        // focus input which has class "mealName"
        focusInput: function() {
            document.querySelector(DOMstrings.mealName).focus();
        }
    }

})();


// ================== GLOBAL CONTROLLER ==================== 
const controller = (function(calorieCtrl, UICtrl) {
    //stored UI elements
    const DOM = UICtrl.getInput();
    
    function loadEventListeners() {
        // event listener click for add
        document.querySelector(DOM.btnAdd).addEventListener('click', ctrlAddItem);

       // event listener for deleting all items
       document.querySelector(DOM.clearAllBtn).addEventListener('click', ctrlDeleteAllItems);

       //event listener for deleting single item
       document.querySelector(DOM.table).addEventListener('click', ctrlDeleteItemFromTable);
       
       //event listener for link edit
       document.querySelector(DOM.table).addEventListener('click', ctrlEditItem);

       //event listener for cancel button
       document.querySelector(DOM.form).addEventListener('click', ctrlCancel);
    }

    // check if array is empty
    const isEmpty = function(array) {
        if (array === undefined || array.length === 0) {
            return true;
        }else {
            return false;
        }     
        
    };

    // cancel operations
    const ctrlCancel = function(event){
        
        if(event.target.classList.contains('btnCancel')){
            
            showHideButton(DOM.btnAdd, 'block');
            showHideButton(DOM.btnCancel, 'none');
            showHideButton(DOM.btnEdit, 'none');
            //focus input first input
            UICtrl.focusInput();
            // 6. UI Controller clear fields
            UICtrl.clearInput();
        }
    }

    // btn - button, option = 'none' or 'inline-block' or 'block etc
    const showHideButton = function(btn, option){
        document.querySelector(btn).style.display = option;
    }

    // add new item
    const ctrlAddItem = function(e) {
        if(e) {
            e.preventDefault()
        }

        // 1. Get the field input data
        const dataInput = UICtrl.getInputData();

        // 2. Check if array is not empty
        if(!isEmpty(dataInput)) {
            if(dataInput !== false) {
            // 3. Add the item to calorie controller
            calorieCtrl.addMealToData(dataInput.mealName, parseFloat(dataInput.calorie), parseFloat(dataInput.proteins), parseFloat(dataInput.carbs), parseFloat(dataInput.fat));

            // 4. Calculate all things: calories, proteins, carbs and fat
            calorieCtrl.calculateAll();

            // get total calories, proteins, carbs and fat
            const countedData =  calorieCtrl.getData();

            // 5. Display total numbers in UI
            const displayTotals = UICtrl.displayCountedData(countedData);
            
            document.querySelector('.items__table--tbody').innerHTML = '';
            // 6. Add the item to the UI
            const items = calorieCtrl.getItems();
            const addItemToTable = UICtrl.displayItemInUI(items);
            //focus input first input
            UICtrl.focusInput();
            // 7. UI Controller clear fields
            UICtrl.clearInput();
            }else {
                //show message
                document.querySelector(DOM.message).innerHTML = UICtrl.message("Numbers can only be equal 0 or bigger than 0!", 'error');
            }
           
            
        }else {
            //show message
            document.querySelector(DOM.message).innerHTML = UICtrl.message('All fields are required!', 'error');
        }
        

    };

    // edit item
    const ctrlEditItem = function() {
        let itemInForm, ID;
        if(event.target.classList.contains('linkEdit')){

             IDtr = event.target.parentElement.parentElement.id;
            //get item by ID
            itemInForm = calorieCtrl.getItemById(parseInt(IDtr));
            
            //show data of this item in form
            const displayInForm = UICtrl.displayItemInForm(itemInForm);
            
            //add event lister for editing
            document.querySelector(DOM.btnEdit).addEventListener('click', ()=>{
                 let item, ID;
                
                 //get hidden id
                 ID = document.querySelector(DOM.hiddenInputID).value;
                 //get item by ID
                 item = calorieCtrl.getItemById(parseInt(ID));
                
                 const dataInput = UICtrl.getInputData();
                // console.log(ID);
                 if(!isEmpty(dataInput)) {
                    if(dataInput !== false) {
                    //update item 
                    const updateItem = calorieCtrl.updateItem(parseInt(item.id), dataInput);
                    
                    //calculate all things: calories, proteins, carbs and fat
                    calorieCtrl.calculateAll();

                    //get total calories, proteins, carbs and fat
                    const countedData =  calorieCtrl.getData();

                    //display total numbers in UI
                    const displayTotals = UICtrl.displayCountedData(countedData);

                    // display items in UI
                    const items = calorieCtrl.getItems();
                    const addItemToTable = UICtrl.displayItemInUI(items);

                    //show message
                     document.querySelector(DOM.message).innerHTML = UICtrl.message('You updated successfuly!', 'success');

                     showHideButton(DOM.btnAdd, 'block');
                     showHideButton(DOM.btnCancel, 'none');
                     showHideButton(DOM.btnEdit, 'none');
                    

                    //focus input first input
                    UICtrl.focusInput();
                    // 6. UI Controller clear fields
                    UICtrl.clearInput();
                    }else {
                         //show message
                        document.querySelector(DOM.message).innerHTML = UICtrl.message("Numbers can only be equal 0 or bigger than 0!", 'error');
                    }
                  
                 }

            });


        }
    }

    // delete all items from table in UI
    const ctrlDeleteAllItems = function() {
        //1. Delete all items from calorie controller
        calorieCtrl.removeAllItems();
        //2. Display data data after deleting items

        // Calculate all things: calories, proteins, carbs and fat
        calorieCtrl.calculateAll();

        // Get total calories, proteins, carbs and fat
        const countedData =  calorieCtrl.getData();

        // Display total numbers in UI
        const displayTotals = UICtrl.displayCountedData(countedData);

        // Delete from table items
        UICtrl.removeAllItemsFromTable();

        //focus input first input
        UICtrl.focusInput();
        // 6. UI Controller clear fields
        UICtrl.clearInput();

        showHideButton(DOM.btnAdd, 'block');
        showHideButton(DOM.btnCancel, 'none');
        showHideButton(DOM.btnEdit, 'none');
         

    }

    // delete single item from table in UI
    const ctrlDeleteItemFromTable = function(event){
 
        if(event.target.classList.contains('btnDelete')){
            const ID = event.target.parentElement.parentElement.id;

            const removeItemFromData = calorieController.removeItem(parseInt(ID));

            const removeItemFromUI = UICtrl.removeItemFromUI(ID);
            

            // Calculate all things: calories, proteins, carbs and fat
            calorieCtrl.calculateAll();

            // Get total calories, proteins, carbs and fat
            const countedData =  calorieCtrl.getData();

            // Display total numbers in UI
            const displayTotals = UICtrl.displayCountedData(countedData);

            //focus input first input
            UICtrl.focusInput();
            // 6. UI Controller clear fields
            UICtrl.clearInput();

            showHideButton(DOM.btnAdd, 'block');
            showHideButton(DOM.btnCancel, 'none');
            showHideButton(DOM.btnEdit, 'none');
        }

    }

    return {
        init: function() {
            loadEventListeners();
        },
        defaultValues: function(){
            document.querySelector(DOM.totalCalorie).textContent = 0 + ' g';
            document.querySelector(DOM.totalProteins).textContent = 0 +' g';
            document.querySelector(DOM.totalCarbs).textContent = 0 +' g';
            document.querySelector(DOM.totalFat).textContent = 0 +' g';
        }
    }

    
    
})(calorieController, UIController);

controller.init();
controller.defaultValues();