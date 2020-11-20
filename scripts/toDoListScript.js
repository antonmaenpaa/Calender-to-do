/**
* Add eventlisteners to Buttons.
*/
function eventListenersButtons(){
   const confirm = document.getElementById('confirmAddItem'); 
   confirm.onclick = takeInput; 

   const remove = document.getElementById('removeItem'); 
   remove.onclick = removeButton;
}

/**
* takes input text as value.
*/
function takeInput(){
   let input = document.getElementById('addItem').value;
   addNewItemToList(input);

}

/**
 * @param {string} input takes user text input from input box and sends it to list. 
 */
function addNewItemToList(input){
   const ul = document.getElementById("ul-items");
   const li = document.createElement("li");
   const clearInput = document.getElementById('addItem');
   li.setAttribute("id", input);
   li.appendChild(document.createTextNode(input)); // gives all li differents textNodes with input text.
   ul.appendChild(li);
   clearInput.value = '';
  
   /* listItemArray.push(li);
   console.log(listItemArray)

   
   let listItemArray = [];
   for (let i = 0; i < listItemArray.length; i++) {
      let liIndex = listItemArray[i];
      console.log("loop works")
      liIndex.addEventListener('click', removeLiItemOnclick);
      break;
   }  */
   addListIds(input)
}

/** 
* ads different ids to each list item
* @param {string} input
*/
function addListIds(input){
   const ul = document.querySelectorAll("#ul-items li");
   for(let i = 0; i < ul.length; i++){
      ul[i].addEventListener('click', selectFromList); 
      ul[i].id += 1;
   }
}


/**loops trough all list items and checks wich list item is clicked
 * @param {click} event  and turns it orange and adds a class
 */
function selectFromList(event){
   const ul = document.querySelectorAll("li");
   for (let list of ul) {
      if (event.target.id === list.id){
         list.style.color = "orange";
         list.className = "active";
      } else if (event.target.id != list.id){ // makes the non selected list item back to black.
         list.style.color = "black";
         list.className = " ";
      }
   } 
} 

// removes the list item with the class name active on it. 

function removeButton(){
   const remove = document.getElementsByClassName('active');
   while (remove.length > 0) remove[0].remove();
}

